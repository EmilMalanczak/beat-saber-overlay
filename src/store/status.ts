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
