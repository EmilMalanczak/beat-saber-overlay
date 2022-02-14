import create from 'zustand'
import { NoteCutObject } from '../types/Events'

export type NoteScore = {
  id: NoteCutObject['noteID']
  x: NoteCutObject['noteLine']
  y: NoteCutObject['noteLayer']
  score: NoteCutObject['finalScore']
  radians: number
}

type ScoreStore = {
  score: number
  noteScores: NoteScore[]
  unmountScoreNote: (id: NoteCutObject['noteID']) => void
  mountScoreNote: (note: NoteScore) => void
}

export const useScoreStore = create<ScoreStore>((set, get) => ({
  score: 0,
  noteScores: [],
  unmountScoreNote: (noteId) => {
    const { noteScores } = get()

    const scores = [...noteScores]
    const noteIndex = scores.findIndex(({ id }) => noteId === id)

    if (noteIndex !== -1) {
      scores.splice(noteIndex, 1)
    }

    set({
      noteScores: scores
    })
  },
  mountScoreNote: (note) => {
    const { noteScores } = get()

    set({
      noteScores: [...noteScores, note]
    })
  }
}))
