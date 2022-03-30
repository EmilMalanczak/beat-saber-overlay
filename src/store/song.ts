import create from 'zustand'

import { BeatmapObject } from 'types/Events'
import { Song } from 'types/Song'

type SongDetails = {
  author: BeatmapObject['songAuthorName']
  mapper: BeatmapObject['levelAuthorName']
  cover: BeatmapObject['songCover']
  difficulty: {
    level: BeatmapObject['difficultyEnum']
    name: BeatmapObject['difficulty']
  }
}

type SongStore = {
  loading: boolean
  error: boolean
  paused: boolean
  song: Song | null
  details: SongDetails | null
  setLoading: (isLoading: boolean) => void
  getSong: (hash: string) => Promise<void>
}

export const useSongStore = create<SongStore>((set, get) => ({
  loading: false,
  error: false,
  paused: false,
  song: null,
  details: null,
  getSong: async (hash) => {
    try {
      get().setLoading(true)

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
