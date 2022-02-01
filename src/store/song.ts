import create from 'zustand'
import { Song } from '../types/Song'
import { logStore } from '../utils/logStore'

type StatusStore = {
  loading: boolean
  error: boolean
  song: Song | null
  setLoading: (isLoading: boolean) => void
  getSong: (hash: string) => Promise<void>
}

export const useStatusStore = logStore(
  create<StatusStore>((set) => ({
    loading: false,
    error: false,
    song: null,
    getSong: async (hash) => {
      try {
        const song = { hash } as any // TODO fetch song from beatsaver

        set({ song, loading: false, error: false })
      } catch (e) {
        console.error('[Beatsaver]: there was a problem with fetching song info')
        console.error(e)

        set({ error: true })
      }
    },
    setLoading: (loading) => {
      set({ loading })
    }
  }))
)
