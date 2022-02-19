import create from 'zustand'
import { NoteCutObject } from '../types/Events'

export type NoteScorex = {
  id: NoteCutObject['noteID']
  x: NoteCutObject['noteLine']
  y: NoteCutObject['noteLayer']
  score: NoteCutObject['finalScore']
  radians: number
}

export type NoteCut = {
  id?: NoteCutObject['noteID']
  x: NoteCutObject['noteLine']
  y: NoteCutObject['noteLayer']
  score?: NoteCutObject['finalScore']
  radians?: number
  direction?: NoteCutObject['noteCutDirection']
  deviation?: number
  fromCenter?: number
  active: boolean
  color?: string
  badCut?: boolean
}

type ScoreStore = {
  score: number
  noteScores: Omit<NoteCut, 'active'>[]
  noteCuts: NoteCut[][]
  unmountScoreNote: (id: NoteCutObject['noteID']) => void
  // mountScoreNote: (note: NoteCut) => void
  cutNote: (note: Omit<NoteCut, 'active'>) => void
  hideCut: (params: Pick<NoteCut, 'x' | 'y'>) => void
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
  cutNote: (note) => {
    const { noteCuts, noteScores } = get()

    const cuts = [...noteCuts]
    const scores = [...noteScores, note]

    cuts[2 - note.y][note.x] = {
      active: true,
      ...note
    }

    set({
      noteCuts: cuts,
      noteScores: scores
    })
  },
  hideCut: ({ x, y }) => {
    const { noteCuts } = get()

    const cuts = [...noteCuts]

    cuts[2 - y][x] = {
      active: false,
      x,
      y
    }

    set({
      noteCuts: cuts
    })
  },
  resetStore: () => {
    set({
      noteScores: [],
      noteCuts: [generateCutNotes(0), generateCutNotes(1), generateCutNotes(2)]
    })
  }
}))
