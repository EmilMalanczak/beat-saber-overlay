import { randomInt } from './randomInt'

export const generateRandomNote = () => {
  const x = randomInt(0, 3)
  const y = randomInt(0, 2)
  let radians = 0

  if (x === 0) {
    radians = randomInt(135, 225)
  }

  if (x === 1) {
    radians = randomInt(90, 135)
  }

  if (x === 2) {
    radians = randomInt(45, 90)
  }

  if (x === 3) {
    radians = randomInt(0, 45)
  }

  return {
    id: randomInt(0, 40000),
    score: randomInt(98, 115),
    x,
    y: 0,
    radians: (radians * Math.PI) / 180
  }
}
