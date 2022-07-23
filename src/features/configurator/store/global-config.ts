import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import { Saber } from 'features/socket/types/saber'

type UIStore = {
  colors: Record<Saber, string>
  setSaberColors: (colors: UIStore['colors']) => void
}

export const useGlobalConfigStore = create<UIStore>((set) => ({
  colors: {
    [Saber.A]: 'rgb(200, 20, 20)',
    [Saber.B]: 'rgb(40, 142, 210)'
  },
  setSaberColors: (colors) => {
    set({ colors })
  }
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Global config store', useGlobalConfigStore)
}
