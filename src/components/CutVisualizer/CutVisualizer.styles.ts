import { createStyles } from '@mantine/styles'
import { CutVisualizerProps } from './CutVisualizer'

export const useStyles = createStyles((_, { gap, cellSize }: CutVisualizerProps) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    position: 'absolute',
    bottom: 40,
    right: 40
  },
  blockWrapper: {
    // @ts-ignore
    padding: (gap || (Math.sqrt(2) - 1.08) * cellSize) / 2,

    // adding grid internal borders
    '&:not(:nth-child(-n+4))': {
      borderTop: '2px solid black'
    },

    '&:not(:nth-child(4n+1))': {
      borderLeft: '2px solid black'
    }
  }
}))
