import { showNotification } from '@mantine/notifications'
import { useEffect } from 'react'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import type { SetState } from 'zustand'

import { ComponentOptions, Option, ScreenType } from 'features/configurator/options/types/options'
import { useLocalStorage } from 'hooks/use-local-storage'
import { parseJSON } from 'utils/parseJSON'

type CanvasParams = {
  width: number
  height: number
  zoom: number
}

type ElementType = ComponentOptions & { cords: { x: number; y: number }; index: number }
export type ConfiguratorElements = Record<ScreenType, Omit<ElementType, 'index'>[]>

export type LocalStorageConfig = {
  elements: ConfiguratorElements
  canvas: CanvasParams
}

type ConfiguratorStore = {
  isDragging: boolean
  // each components has its own config in /options folder
  // we will edit the default props from options drawer later
  elements: ConfiguratorElements
  activeElement: ElementType | null
  activeScreen: ScreenType
  canvas: CanvasParams
  setCanvas: (params: Partial<CanvasParams>) => void
  dragElement: (params: { index: number; x: number; y: number }) => void
  addElement: (element: ComponentOptions) => void
  removeElement: (index: number) => void
  selectElement: (index: number) => void
  changeActiveScreen: (screen: ScreenType) => void
  editActiveElement: (id: string, value: any) => void
  setInitialElements: (initialElements: any) => void
  saveConfig: () => void
  toggleActiveElementComponents: (id: string, isChecked: boolean) => void
  editActiveELementState: (
    callback: (state: ConfiguratorStore, set: SetState<ConfiguratorStore>) => void
  ) => void
}

export const useConfiguratorStore = create<ConfiguratorStore>((set, get) => ({
  elements: {
    [ScreenType.InGame]: [],
    [ScreenType.Lobby]: []
  },
  isDragging: false,
  activeElement: null,
  activeScreen: ScreenType.InGame,
  canvas: {
    width: 960,
    height: 720,
    zoom: 1
  },
  setInitialElements: (initialElements: ConfiguratorElements) => [
    set({
      elements: initialElements
    })
  ],
  removeElement: (index) => {
    const { activeScreen, elements } = get()
    const currentElements = elements[activeScreen]

    currentElements.splice(index, 1)

    set({
      elements: {
        ...elements,
        [activeScreen]: currentElements
      }
    })
  },
  addElement: (element) => {
    const { activeScreen, elements } = get()
    const currentElements = elements[activeScreen]

    const ableToAdd = !element.unique || !currentElements.some((e) => e.slug === element.slug)

    if (ableToAdd) {
      set({
        elements: {
          ...elements,
          [activeScreen]: [
            ...currentElements,
            {
              ...element,
              cords: {
                x: 0,
                y: 0
              }
            }
          ]
        }
      })
    } else {
      showNotification({
        color: 'red',
        title: 'Cannot add this element',
        message: 'Element with this slug already exists'
      })
    }
  },
  selectElement: (index) => {
    const { activeScreen, elements } = get()
    const currentElements = elements[activeScreen]

    if (index > -1) {
      set({
        activeElement: currentElements[index]
          ? {
              ...currentElements[index],
              index
            }
          : null
      })
    } else {
      set({
        activeElement: null
      })
    }
  },
  toggleActiveElementComponents: (id, isChecked) => {
    const { activeElement } = get()

    if (activeElement) {
      set({
        activeElement: {
          ...activeElement,
          options: activeElement.options.map((option) => {
            if (option?.id === id && option.inputTypeName === Option.TOGGLE_COMPONENTS) {
              return {
                ...option,
                checked: isChecked,
                options: option.options.map((opt) => {
                  if (!isChecked && 'uncheckedValue' in opt) {
                    return {
                      ...opt,
                      value: opt.uncheckedValue
                    }
                  }

                  if (isChecked && 'checkedValue' in opt) {
                    return {
                      ...opt,
                      value: opt.checkedValue
                    }
                  }

                  return opt
                })
              }
            }

            return {
              ...option,
              checked: isChecked
            }
          })
        }
      })
    }
  },
  editActiveElement: (id, value) => {
    const { activeElement } = get()

    if (activeElement) {
      set({
        activeElement: {
          ...activeElement,
          options: activeElement.options.map((option) => {
            switch (option.inputTypeName) {
              case Option.TOGGLE_COMPONENTS: {
                return {
                  ...option,
                  options: option.options.map((opt) => {
                    if (opt?.id === id) {
                      return {
                        ...opt,
                        value
                      }
                    }

                    return opt
                  })
                }
              }

              default: {
                if (option?.id === id) {
                  return {
                    ...option,
                    value
                  }
                }

                return option
              }
            }
          })
        }
      })
    }
  },
  editActiveELementState: (callback) => callback(get(), set),
  dragElement: ({ x, y, index }) => {
    const { elements, activeScreen } = get()
    const currentElements = elements[activeScreen]

    currentElements[index].cords = { x, y }

    set({
      // without spread equality doesnt get difference since we mutate nested object
      elements: {
        ...elements,
        [activeScreen]: currentElements
      }
    })
  },
  saveConfig: () => {
    const { activeElement, elements, activeScreen } = get()
    const currentElements = elements[activeScreen]

    if (activeElement) {
      currentElements[activeElement.index] = activeElement

      set({
        elements: {
          ...elements,
          [activeScreen]: currentElements
        }
      })
    }
  },
  setCanvas: (params) => {
    const { canvas } = get()

    set({
      canvas: {
        ...canvas,
        ...params
      }
    })
  },
  changeActiveScreen: (screen) => {
    set({
      activeScreen: screen
    })
  }
}))

type AnySelector = (state: ConfiguratorStore) => any

export const useSyncedConfiguratorStore = <S extends AnySelector>(selector: S): ReturnType<S> => {
  const [localConfig, setLocalConfig] = useLocalStorage('overlay-config', '')

  const [setInitialElements, elements, canvas, setCanvas] = useConfiguratorStore((state) => [
    state.setInitialElements,
    state.elements,
    state.canvas,
    state.setCanvas
  ])
  const store = useConfiguratorStore(selector)

  useEffect(() => {
    if (localConfig) {
      const { elements: initialElement, canvas: initialCanvas } = parseJSON<LocalStorageConfig>(
        localConfig
      ) as LocalStorageConfig

      setInitialElements(initialElement)
      setCanvas(initialCanvas)
    }
    // it causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLocalConfig(
      JSON.stringify({
        elements,
        canvas
      })
    )
  }, [elements, setLocalConfig, canvas])

  return store
}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Configurator store', useConfiguratorStore)
}
