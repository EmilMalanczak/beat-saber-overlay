import create from 'zustand'
import { NoteCutObject } from '../types/Events'

export type NoteScore = {
  id: NoteCutObject['noteID']
  x: NoteCutObject['noteLine']
  y: NoteCutObject['noteLayer']
  score: NoteCutObject['finalScore']
  radians: number
}

export type NoteCut = {
  x: NoteCutObject['noteLine']
  y: NoteCutObject['noteLayer']
  direction?: NoteCutObject['noteCutDirection']
  deviation?: number
  fromCenter?: number
  active: boolean
  color?: string
}

type ScoreStore = {
  score: number
  noteScores: NoteScore[]
  noteCuts: NoteCut[][]
  unmountScoreNote: (id: NoteCutObject['noteID']) => void
  mountScoreNote: (note: NoteScore) => void
  cutNote: (note: Omit<NoteScore, 'active'>) => void
  hideCut: (params: Pick<NoteScore, 'x' | 'y'>) => void
}

const generateCutNotes = (row: NoteCutObject['noteLayer']): NoteCut[] =>
  ([0, 1, 2, 3] as NoteCutObject['noteLine'][]).map((column) => ({
    x: column,
    y: row,
    active: false
  }))

export const useScoreStore = create<ScoreStore>((set, get) => ({
  score: 0,
  noteScores: [],
  noteCuts: [generateCutNotes(0), generateCutNotes(1), generateCutNotes(2)],
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
  },
  cutNote: (note) => {
    const { noteCuts } = get()

    const cuts = [...noteCuts]

    cuts[note.y][note.x] = {
      active: true,
      ...note
    }

    set({
      noteCuts: cuts
    })
  },
  hideCut: ({ x, y }) => {
    const { noteCuts } = get()

    const cuts = [...noteCuts]

    cuts[y][x] = {
      active: false,
      x,
      y
    }

    set({
      noteCuts: cuts
    })
  }
}))
