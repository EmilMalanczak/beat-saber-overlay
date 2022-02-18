import { createStyles } from '@mantine/styles'
import { HitScoreVisualizerProps } from './HitScoreVisualizer'

export const useStyles = createStyles((_, { width, rowHeight, rows }: HitScoreVisualizerProps) => ({
  grid: {
    width,
    height: rows * rowHeight,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: `repeat(${rows}, 1fr)`
  }
}))
