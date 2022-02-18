import { NoteCut } from '../store/score'
import { randomInt } from './randomInt'

const directions = [
  'Up',
  'UpLeft',
  'UpRight',
  'Right',
  'DownRight',
  'Down',
  'DownLeft',
  'DownRight',
  'Left',
  'Any'
]

export const generateRandomCut = () => {
  const x = randomInt(0, 3)
  const y = randomInt(0, 2)

  const isSaberA = randomInt(0, 1)
  //   directions[randomInt(0, directions.length - 1)]
  return {
    direction: directions[randomInt(0, directions.length - 1)],
    x,
    y,
    deviation: randomInt(0, 20),
    score: randomInt(98, 115),
    id: randomInt(0, 30000),
    color: isSaberA ? 'rgb(200, 20, 20)' : 'rgb(106, 13, 179)',
    fromCenter: randomInt(-100, 100) / 100
  }
}

// red 200, 20, 20
// blue 40, 142, 210
// violet 106, 13, 179
// yellow
