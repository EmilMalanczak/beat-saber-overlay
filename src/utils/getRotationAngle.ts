import type { NoteCutObject } from '../types/Events'

export const getRotationAngle = (direction: NoteCutObject['noteCutDirection']): number => {
  switch (direction) {
    case 'Right':
      return 0

    case 'UpRight':
      return 45

    case 'Up':
      return 90

    case 'UpLeft':
      return 135

    case 'Left':
      return 180

    case 'DownLeft':
      return 225

    case 'Down':
      return 270

    case 'DownRight':
      return 315

    default:
      return 0
  }
}
