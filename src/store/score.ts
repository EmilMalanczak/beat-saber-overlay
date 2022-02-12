import create from 'zustand'
import { NoteCutObject } from '../types/Events'

type NoteScore = {
  id: NoteCutObject['noteID']
  x: NoteCutObject['noteLine']
  y: NoteCutObject['noteLayer']
  score: NoteCutObject['finalScore']
}

type ScoreStore = {
  score: number
  noteScores: NoteScore[]
  unmountScoreNote: (id: NoteCutObject['noteID']) => void
  mountScoreNote: (note: NoteScore) => void
}

export const usePlayerStore = create<ScoreStore>((set, get) => ({
  score: 0,
  noteScores: [],
  unmountScoreNote: (noteId) => {
    const { noteScores } = get()

    const scores = [...noteScores]
    const noteIndex = scores.findIndex(({ id }) => noteId === id)

    set({
      noteScores: noteIndex !== -1 ? scores.splice(noteIndex, 1) : scores
    })
  },
  mountScoreNote: (note) => {
    const { noteScores } = get()

    set({
      noteScores: [...noteScores, note]
    })
  }
}))
