import { randomInt } from 'utils/random-int'

export const generateRandomScore = () => {
  const randomScore = randomInt(50, 100)

  return {
    score: randomScore,
    maxScore: 100
  }
}
