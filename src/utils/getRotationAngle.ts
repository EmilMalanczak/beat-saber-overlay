import type { NoteCutObject } from '../types/Events'

export const getRotationAngle = (direction?: NoteCutObject['noteCutDirection']): number => {
  switch (direction) {
    case 'Right':
      return 90

    case 'UpRight':
      return 135

    case 'Up':
      return 180

    case 'UpLeft':
      return 225

    case 'Left':
      return 270

    case 'DownLeft':
      return 315

    case 'Down':
      return 0

    case 'DownRight':
      return 45

    default:
      return 0
  }
}
