import create from 'zustand'
import { logStore } from '../utils/logStore'

type StatusStore = {
  connected: boolean
  connect: () => void
  disconnect: () => void
}

export const useStatusStore = logStore(
  create<StatusStore>((set) => ({
    connected: false,
    connect: () => set({ connected: true }),
    disconnect: () => set({ connected: false })
  }))
)
