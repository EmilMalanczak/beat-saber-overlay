import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import { scoresaber } from 'features/scoresaber/scoresaber'
import { Player, PlayerDto } from 'features/scoresaber/types/player'
import { transformUserDto } from 'features/scoresaber/user-dto'

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

      const { data: player } = await scoresaber.get<Player>(`/player/${id}/full`)
      console.log(player)

      set({ player: transformUserDto(player), fetched: true, loading: false, error: false })
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
