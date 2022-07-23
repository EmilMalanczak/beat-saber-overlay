import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

type StatusStore = {
  connected: boolean
  connect: () => void
  disconnect: () => void
}

export const useStatusStore = create<StatusStore>((set) => ({
  connected: false,
  connect: () => set({ connected: true }),
  disconnect: () => set({ connected: false })
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Status store', useStatusStore)
}
