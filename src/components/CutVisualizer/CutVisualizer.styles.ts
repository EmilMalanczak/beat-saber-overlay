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
    padding: (gap || Math.sqrt(2) * cellSize - cellSize) / 2,
    /* Add border bottom to all items */
    borderTop: '1px solid black',
    borderLeft: '1px solid black',

    /* Remove border bottom from last item & from second last if its odd */
    '&:nth-child(1)': {
      borderTop: 'none',
      borderLeft: 'none'
    },

    /* Add right border to every second item */
    '&:nth-child(odd)': {}
  }
}))
