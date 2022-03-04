import { useLocalStorageValue } from '@mantine/hooks'
import { useEffect } from 'react'
import create from 'zustand'
import type { ComponentOptions } from '../types/Options'

type ConfiguratorStore = {
  isDragging: boolean
  // each components has its own config in /options folder
  // we will edit the default props from options drawer later
  elements: Record<string, any>
  zoom: number
  canvas: {
    width: number
    height: number
  }
  dragElement: (params: { slug: string; x: number; y: number }) => void
  addElement: (element: ComponentOptions) => void
  removeElement: (slug: string) => void
  setInitialElements: (initialElements: any) => void
}

export const useConfiguratorStorex = create<ConfiguratorStore>((set, get) => ({
  elements: [],
  zoom: 1,
  isDragging: false,
  canvas: {
    width: 720,
    height: 480
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
  }
}))

export const useConfiguratorStore = (): ConfiguratorStore => {
  const [localConfig, setLocalConfig] = useLocalStorageValue({
    key: 'overlay-config'
  })

  const [setInitialElements, elements] = useConfiguratorStorex((state) => [
    state.setInitialElements,
    state.elements
  ])
  const store = useConfiguratorStorex()

  useEffect(() => {
    if (localConfig) {
      setInitialElements(JSON.parse(localConfig))
    }
  }, [])

  useEffect(() => {
    setLocalConfig(JSON.stringify(elements))
  }, [elements, setLocalConfig])

  return store as ConfiguratorStore
}
