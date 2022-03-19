import type { NoteCutObject } from '../types/Events'

export const getRotationAngle = (direction?: NoteCutObject['noteCutDirection']): number => {
  switch (direction) {
    case 'Right':
      return 270

    case 'UpRight':
      return 315

    case 'Up':
      return 0

    case 'UpLeft':
      return 45

    case 'Left':
      return 90

    case 'DownLeft':
      return 135

    case 'Down':
      return 180

    case 'DownRight':
      return 225

    default:
      return 0
  }
}
