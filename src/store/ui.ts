import create from 'zustand'
import { Saber } from '../types/Saber'

type UIStore = {
  colors: Record<Saber, string>
  setSaberColors: (colors: UIStore['colors']) => void
}

export const useUIStore = create<UIStore>((set) => ({
  colors: {
    [Saber.A]: 'rgb(200, 20, 20)',
    [Saber.B]: 'rgb(200, 20, 20)'
  },
  setSaberColors: (colors) => {
    set({ colors })
  }
}))
