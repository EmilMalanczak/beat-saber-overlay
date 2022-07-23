import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import { beatsaver } from 'features/beatsaver/beatsaver'
import { transferSongDto } from 'features/beatsaver/song-dto'
import { Song, SongDto } from 'features/beatsaver/types/song'

type SongStore = {
  loading: boolean
  error: boolean
  paused: boolean
  song: SongDto | null
  setLoading: (isLoading: boolean) => void
  getSong: (hash: string) => Promise<void>
}

export const useSongStore = create<SongStore>((set, get) => ({
  loading: false,
  error: false,
  paused: false,
  song: null,
  getSong: async (hash) => {
    try {
      get().setLoading(true)

      const { data: song } = await beatsaver.get<Song>(`/maps/hash/${hash}`)
      console.log(song)

      set({
        song: transferSongDto(song),
        loading: false,
        error: false
      })
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

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Song store', useSongStore)
}
