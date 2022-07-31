import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import { api } from 'constants/api'
import { PlayerDto } from 'features/scoresaber/types/player'

type PlayerStore = {
  loading: boolean
  fetched: boolean
  error: boolean
  player: PlayerDto | null
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

      const { data: player } = await api.get<PlayerDto>(`/scoresaber/player/${id}`)
      console.log(player)

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

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Player store', usePlayerStore)
}
