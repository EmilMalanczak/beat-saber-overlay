import { useLocalStorageValue } from '@mantine/hooks'
import { useEffect } from 'react'
import create from 'zustand'
import type { SetState, StateSelector } from 'zustand'
import { ComponentOptions, Option } from '../types/Options'

type ElementType = ComponentOptions & { cords: { x: number; y: number } }

type ConfiguratorStore = {
  isDragging: boolean
  // each components has its own config in /options folder
  // we will edit the default props from options drawer later
  elements: Record<string, ElementType>
  activeElement: ElementType | null
  canvas: {
    width: number
    height: number
    zoom: number
  }
  setCanvas: (params: { width?: number; height?: number; zoom?: number }) => void
  dragElement: (params: { slug: string; x: number; y: number }) => void
  addElement: (element: ComponentOptions) => void
  removeElement: (slug: string) => void
  selectElement: (slug: string) => void
  editActiveElement: (id: string, value: any) => void
  setInitialElements: (initialElements: any) => void
  saveConfig: () => void
  toggleActiveElementComponents: (id: string, isChecked: boolean) => void
  editActiveELementState: (
    callback: (state: ConfiguratorStore, set: SetState<ConfiguratorStore>) => void
  ) => void
}

export const useConfiguratorStoreBare = create<ConfiguratorStore>((set, get) => ({
  elements: {},
  isDragging: false,
  activeElement: null,
  canvas: {
    width: 1920,
    height: 1080,
    zoom: 1
  },
  setInitialElements: (initialElements) => [
    set({
      elements: initialElements
    })
  ],
  removeElement: (slug) => {
    const currentElements = get().elements

    delete currentElements[slug]

    set({
      elements: currentElements
    })
  },
  addElement: (element) => {
    const currentElements = get().elements

    set({
      elements: {
        ...currentElements,
        [element.slug]: {
          ...element,
          cords: {
            x: 0,
            y: 0
          }
        }
      }
    })
  },
  selectElement: (slug) => {
    if (slug) {
      set({
        activeElement: Object.values(get().elements).find((el) => el.slug === slug) || null
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

      const button = document.getElementById(id)

      console.log({ button })
    }
  },
  editActiveELementState: (callback) => callback(get(), set),
  dragElement: ({ slug, x, y }) => {
    const currentElements = get().elements

    set({
      elements: {
        ...currentElements,
        [slug]: {
          ...currentElements[slug],
          cords: {
            x,
            y
          }
        }
      }
    })
  },
  saveConfig: () => {
    const { activeElement, elements } = get()

    if (activeElement?.slug) {
      set({
        elements: {
          ...elements,
          [activeElement.slug]: activeElement
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
  }
}))

export const useConfiguratorStore = (
  selector: StateSelector<ConfiguratorStore, any> = (state) => state
): ConfiguratorStore => {
  const [localConfig, setLocalConfig] = useLocalStorageValue({
    key: 'overlay-config'
  })

  const [setInitialElements, elements] = useConfiguratorStoreBare((state) => [
    state.setInitialElements,
    state.elements
  ])
  const store = useConfiguratorStoreBare(selector)

  useEffect(() => {
    if (localConfig) {
      setInitialElements(JSON.parse(localConfig))
    }
    // it causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLocalConfig(JSON.stringify(elements))
  }, [elements, setLocalConfig])

  return { ...store }
}
