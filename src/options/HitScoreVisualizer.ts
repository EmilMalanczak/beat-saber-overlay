import { HitScoreVisualizer } from '../components/HitScoreVisualizer'
import type { ComponentOptions } from '../types/Options'

export const options: ComponentOptions = {
  name: 'Hit Score Visualizer',
  slug: 'score-visualizer',
  component: HitScoreVisualizer,
  category: 'visualizers',
  order: 0,
  image: '',
  description: 'Display cut scores from the game',
  options: [],
  defaultProps: {
    rows: 1,
    width: '100%',
    unmountTime: 350,
    rowHeight: 70 + (Math.SQRT2 - 1.08) * 70,
    maxRotate: 12,
    scoreCutShift: 10,

    style: {
      width: 400
    }
  }
}
