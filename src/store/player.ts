import create from 'zustand'

import { scoresaber } from 'api/scoresaber'
import { Player } from 'types/Player'

type PlayerStore = {
  loading: boolean
  fetched: boolean
  error: boolean
  player: Player | null
  getPlayerInfo: (id: string) => Promise<void>
  setLoading: (isLoading: boolean) => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  loading: false,
  fetched: false,
  error: false,
  player: null,
  getPlayerInfo: async (id) => {
    try {
      get().setLoading(true)

      const { data: player } = await scoresaber.get<Player>(`/player/${id}/full`) // TODO fetch player from scoresaber

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
