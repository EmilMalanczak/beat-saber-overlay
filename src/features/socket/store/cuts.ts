import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import { NoteCutObject } from 'features/socket/types/events'

type Cords = {
  x: NoteCutObject['noteLine']
  y: NoteCutObject['noteLayer']
}

export type Health = number | 'failed'

export type NoteCut = Cords & {
  id?: NoteCutObject['noteID']
  score?: NoteCutObject['finalScore']
  radians?: number
  direction?: NoteCutObject['noteCutDirection']
  deviation?: number
  fromCenter?: number
  active: boolean
  color?: string
  badCut?: boolean
}

type Scores = Cords & {
  scores: Omit<NoteCut, 'active'>[]
}

type CutStore = {
  noteScores: Scores[][]
  noteCuts: NoteCut[][]
  unmountScoreNote: (
    cut: Cords & {
      id: NoteCutObject['noteID']
    }
  ) => void
  cutNote: (note: Omit<NoteCut, 'active'>) => void
  hideCut: (params: Cords) => void
  resetStore: () => void
}

const rows = [0, 1, 2] as Cords['y'][]
const columns = [0, 1, 2, 3] as Cords['x'][]

const generateGridCells = <T>(defaultState: (cord: { x: Cords['x']; y: Cords['y'] }) => T): T[][] =>
  rows.map((row) => columns.map((column): T => defaultState({ y: row, x: column }) as T))

const defaultScores = generateGridCells<Scores>((cords) => ({
  ...cords,
  scores: []
}))

const defaultCuts = generateGridCells((cords) => ({
  ...cords,
  active: false
}))

export const useCutsStore = create<CutStore>((set, get) => ({
  noteScores: defaultScores,
  noteCuts: defaultCuts,
  unmountScoreNote: ({ id: noteId, x, y }) => {
    const { noteScores } = get()

    const scores = [...noteScores]
    /*
      its faster way of finding index than findIndex
      benchmark:
      https://www.measurethat.net/Benchmarks/Show/17459/0/findindex-vs-indexof---javascript-performancedsadsadas
    */
    const noteIndex = scores[2 - y][x].scores.map(({ id }) => id).indexOf(noteId)

    if (noteIndex !== -1) {
      scores[2 - y][x].scores.splice(noteIndex, 1)
    }

    set({
      noteScores: scores
    })
  },
  cutNote: (note) => {
    const { noteCuts, noteScores } = get()
    const { x, y } = note

    const cuts = [...noteCuts]
    const scores = [...noteScores]

    cuts[2 - y][x] = {
      active: true,
      ...note
    }

    scores[2 - y][x].scores.push(note)

    set({
      noteCuts: cuts,
      noteScores: scores
    })
  },
  hideCut: ({ x, y }) => {
    const { noteCuts } = get()

    const cuts = [...noteCuts]

    cuts[2 - y][x] = {
      ...cuts[2 - y][x],
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
      noteScores: defaultScores,
      noteCuts: defaultCuts
    })
  }
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Cut store', useCutsStore)
}
