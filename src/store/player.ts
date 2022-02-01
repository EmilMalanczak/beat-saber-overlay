import create from 'zustand'
import { Player } from '../types/Player'
import { logStore } from '../utils/logStore'

type StatusStore = {
  loading: boolean
  fetched: boolean
  error: boolean
  player: Player | null
  getPlayerInfo: (id: string) => Promise<void>
  setLoading: (isLoading: boolean) => void
}

export const useStatusStore = logStore(
  create<StatusStore>((set) => ({
    loading: false,
    fetched: false,
    error: false,
    player: null,
    getPlayerInfo: async (id) => {
      try {
        const player = { id } as Player // TODO fetch player from scoresaber

        set({ player, fetched: true, loading: false, error: false })
      } catch (e) {
        console.error('[Scoresaber]: there was a problem with fetching player info')
        console.error(e)

        set({ error: true })
      }
    },
    setLoading: (loading) => {
      set({ loading })
    }
  }))
)
