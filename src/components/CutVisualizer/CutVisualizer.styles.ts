import { createStyles } from '@mantine/styles'
import { CutVisualizerProps } from './CutVisualizer'

export const useStyles = createStyles(
  (_, { gap, cellSize, gridColor, gridBorderSize }: CutVisualizerProps) => ({
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      justifyItems: 'center'
    },
    blockWrapper: {
      /*
        default value is to protect from overflowing notes
        when they are rotated
      */
      // @ts-ignore
      padding: (gap || (Math.sqrt(2) - 1.08) * cellSize) / 2,

      // adding grid internal borders
      '&:not(:nth-child(-n+4))': {
        borderTop: `${gridBorderSize}px solid ${gridColor}`
      },

      '&:not(:nth-child(4n+1))': {
        borderLeft: `${gridBorderSize}px solid ${gridColor}`
      }
    }
  })
)
