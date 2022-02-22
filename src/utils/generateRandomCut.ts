/* eslint-disable operator-linebreak */
import { getRotationAngle } from './getRotationAngle'
import { randomInt } from './randomInt'
import { transformRadiansToAngle } from './transformRadiansToAngle'

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
  const direction = directions[randomInt(0, directions.length - 1)]
  const deviation = randomInt(-35, 35)

  return {
    direction,
    x,
    y,
    deviation,
    score: randomInt(98, 115),
    id: randomInt(0, 30000),
    color: isSaberA ? 'rgb(200, 20, 20)' : 'rgb(106, 13, 179)',
    fromCenter: randomInt(-100, 100) / 100,
    radians: transformRadiansToAngle(
      ((deviation +
        (direction !== 'Any' ? getRotationAngle(direction as any) : randomInt(0, 360)) -
        90) *
        Math.PI) /
        180
    )
  }
}
