import { CutVisualizer } from '../components/CutVisualizer'
import type { ComponentOptions } from '../types/Options'

export const options: ComponentOptions = {
  name: 'CutVisualizer',
  slug: 'cut-visualizer',
  component: CutVisualizer,
  category: 'visualizers',
  order: 0,
  image: '',
  description: 'Display cuts from the game',
  options: [
    {
      prop: 'cellSize',
      type: 'number',
      min: 10,
      max: 300
    }
  ],
  defaultProps: {
    cellSize: 70,
    fadeTime: 150,
    gridColor: '#fff',
    gridBorderSize: 0,
    style: {
      width: 'max-content'
    }
  }
}
