import { CutVisualizer } from '../components/CutVisualizer'
import { Option } from '../types/Options'
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
      propName: 'cellSize',
      inputTypeName: Option.NUMBER,
      min: 10,
      max: 300,
      defaultValue: 70
    },
    {
      propName: 'fadeTime',
      inputTypeName: Option.NUMBER,
      min: 0,
      max: 300,
      defaultValue: 70
    },
    {
      propName: 'gridColor',
      inputTypeName: Option.COLOR
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
