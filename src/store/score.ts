import create from 'zustand'

import { HP_COSTS } from 'constants/score'

export type Health = number | 'failed'

type ScoreStore = {
  score: number
  health: Health
  misses: number
  accuracy: string
  obstacleEnteredTime: number | null
  initializeScore: () => void
  increaseHealth: (health: number) => void
  decreaseHealth: (health: number) => void
  incrementMisses: () => void
  startObstacleHealthLoss: (timestamp: number) => void
  stopObstacleHealthLoss: (timestamp: number) => void
  setScore: (score: number, maxScore: number) => void
}

export const useScoreStore = create<ScoreStore>((set, get) => ({
  score: 0,
  health: 50,
  misses: 0,
  accuracy: '0',
  obstacleEnteredTime: null,
  initializeScore: () => {
    set({
      score: 0,
      health: 50,
      misses: 0,
      accuracy: '100.00'
    })
  },
  increaseHealth: (hp) => {
    const { health } = get()

    if (health !== 'failed') {
      set({
        health: health + hp > 100 ? 100 : health + hp
      })
    }
  },
  decreaseHealth: (hp) => {
    const { health } = get()

    if (health !== 'failed') {
      set({
        health: health - hp < 0 ? 0 : health - hp
      })
    }
  },
  startObstacleHealthLoss: (timestamp) => {
    set({
      obstacleEnteredTime: timestamp
    })
  },
  stopObstacleHealthLoss: (timestamp) => {
    const { decreaseHealth, obstacleEnteredTime } = get()

    const delta = timestamp - (obstacleEnteredTime || 0)

    decreaseHealth(delta * HP_COSTS.obstacle)

    set({
      obstacleEnteredTime: null
    })
  },
  setScore: (score, maxScore) => {
    const accuracy = maxScore > 0 ? ((score / maxScore) * 100).toFixed(2) : '100.00'

    set({
      score,
      accuracy
    })
  },
  incrementMisses: () => {
    const { misses } = get()

    set({
      misses: misses + 1
    })
  }
}))
