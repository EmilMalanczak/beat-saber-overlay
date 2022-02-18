import type { NoteCutObject } from '../types/Events'

export const getRotationAngle = (direction: NoteCutObject['noteCutDirection']): number => {
  switch (direction) {
    case 'Up':
      return 0
    case 'UpRight':
      return 45
    case 'Right':
      return 90
    case 'DownRight':
      return 135
    case 'Down':
      return 180
    case 'DownLeft':
      return 225
    case 'Left':
      return 270
    case 'UpLeft':
      return 315
    default:
      return 0
  }
}
