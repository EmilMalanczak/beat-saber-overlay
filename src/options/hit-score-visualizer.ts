import type { ComponentOptions } from 'types/Options'

import { HitScoreVisualizer } from 'components/HitScoreVisualizer'

export const options: ComponentOptions = {
  name: 'Hit Score Visualizer',
  slug: 'score-visualizer',
  component: HitScoreVisualizer,
  category: 'visualizers',
  order: 0,
  image: '',
  description: 'Display cut scores from the game',
  options: []
}
