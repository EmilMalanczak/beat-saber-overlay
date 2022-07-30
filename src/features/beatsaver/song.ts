import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import { beatsaver } from 'features/beatsaver/beatsaver'
import { transferSongDto } from 'features/beatsaver/song-dto'
import { Song, SongDifficultyEnum, SongDto } from 'features/beatsaver/types/song'

type ActiveSongDifficulty = {
  base: SongDifficultyEnum | null
  custom?: string
}

type SongStore = {
  loading: boolean
  error: boolean
  paused: boolean
  fetched: boolean
  difficulty: ActiveSongDifficulty
  song: SongDto | null
  setLoading: (isLoading: boolean) => void
  getSong: (hash: string) => Promise<void>
  setDifficulty: (difficulty: ActiveSongDifficulty) => void
}

export const useSongStore = create<SongStore>((set, get) => ({
  loading: false,
  error: false,
  paused: false,
  song: null,
  fetched: false,
  difficulty: {
    base: null
  },
  getSong: async (hash) => {
    try {
      get().setLoading(true)

      const { data: song } = await beatsaver.get<Song>(`/maps/hash/${hash}`)
      console.log(song)

      set({
        song: transferSongDto(song),
        loading: false,
        error: false,
        fetched: true
      })
    } catch (e) {
      console.error('[Beatsaver]: there was a problem with fetching song info')
      console.error(e)

      set({ error: true })
    }
  },
  setLoading: (loading) => {
    set({ loading })
  },
  setDifficulty: (difficulty) => {
    set({ difficulty })
  }
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Song store', useSongStore)
}
