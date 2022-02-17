import { createStyles } from '@mantine/styles'
import type { NoteCut } from '../../store/score'
import type { NoteBlockProps } from './NoteBlock'

const getRotationValue = (direction: NoteCut['direction']): number => {
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

const getPositionStyles = (direction: NoteCut['direction']) => {
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

export const useStyles = createStyles(
  (theme, { size = 50, cut: { color = 'blue', direction, deviation = 0 } }: NoteBlockProps) => ({
    block: {
      width: size,
      height: size,
      borderRadius: size * 0.15,
      backgroundColor: color,
      transform: `rotate(${getRotationValue(direction)}deg)`,
      position: 'relative',
      boxShadow: `inset 0 0 20px 8px ${color}, inset -6px 8px 10px 20px rgba(0, 0, 0, 0.5), inset 6px -6px 10px rgba(255, 255, 255, 0.5), inset 6px -6px 10px ${theme.fn.rgba(
        color,
        1
      )}`,
      overflow: 'hidden',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: size * 0.5,
        height: size * 0.5,
        filter: 'blur(90px)',
        borderRadius: '50%',
        background: 'black',
        transform: 'translate3d(-50%, -50%, 0)',
        top: '50%',
        left: '50%'
      }
    },
    indicator: {
      margin: direction !== 'Any' ? size * 0.22 : 0,
      position: 'absolute',
      filter: `drop-shadow(0px 0px 25px ${theme.fn.lighten(color, 0.2)})`,
      zIndex: 1,
      ...getPositionStyles(direction),

      '& path, circle': {
        fill: theme.fn.lighten(color, 0.75)
      }
    },

    cut: {
      width: '10%',
      height: '120%',
      backgroundColor: theme.fn.lighten(color, 0.9),
      boxShadow: '0px 0px 20px 2px #fff',
      position: 'absolute',
      top: '-10%',
      left: '50%',
      transform: `translateX(-50%) rotate(${-deviation}deg)`,
      zIndex: 2
    }
  })
)
