import type { NoteCut } from '../store/score'

export const getNoteIndicatorPosition = (direction: NoteCut['direction']) => {
  if (direction === 'Any') {
    return {
      transform: 'translate3d(-50%, -50%, 0)',
      top: '50%',
      left: '50%'
    }
  }

  return {
    bottom: 0
  }
}
