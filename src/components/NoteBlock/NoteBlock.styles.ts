import { createStyles } from '@mantine/styles'
import type { NoteCut } from '../../store/score'
import { getRotationAngle } from '../../utils/getRotationAngle'
import type { NoteBlockProps } from './NoteBlock'

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
  (
    theme,
    {
      size = 50,
      cut: { color = 'blue', direction = 'Any', deviation = 0, fromCenter = 0 }
    }: NoteBlockProps
  ) => ({
    wrapper: {
      position: 'relative',
      width: size,
      height: size,
      borderRadius: size * 0.15,
      transform: `rotate(${-getRotationAngle(direction)}deg)`,
      overflow: 'hidden'
    },
    block: {
      opacity: 0.2,
      backgroundColor: color,
      position: 'absolute',
      inset: 0,
      boxShadow: `inset 0 0 20px 8px ${color}, inset -6px 8px 10px 20px rgba(0, 0, 0, 0.5), inset 6px -6px 10px rgba(255, 255, 255, 0.5), inset 6px -6px 10px ${theme.fn.rgba(
        color,
        1
      )}`,

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
      opacity: 1,
      width: '10%',
      height: '150%',
      backgroundColor: theme.fn.lighten('rgb(229, 0, 0)', 0),
      boxShadow: '0px 0px 10px 2px #fff',
      position: 'absolute',
      top: '-25%',
      left: `${50 - fromCenter * 50}%`,
      transform: `translateX(-50%) rotate(${-deviation}deg)`,
      zIndex: 2
    }
  })
)
