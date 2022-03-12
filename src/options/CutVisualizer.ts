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
      label: 'Size',
      description: 'size of each note',
      min: 10,
      max: 300,
      value: 100
    },
    {
      propName: 'fadeTime',
      inputTypeName: Option.NUMBER,
      label: 'Fade',
      description: 'time in ms after the note disappear',
      min: 0,
      max: 1000,
      value: 300
    },
    {
      inputTypeName: Option.TOGGLE,
      label: 'Show grid',
      checked: false,
      options: [
        {
          propName: 'gridColor',
          inputTypeName: Option.COLOR,
          format: 'rgba',
          label: 'Grid color',
          value: 'rgba(0, 0, 0, 1)'
        },
        {
          propName: 'gridSize',
          inputTypeName: Option.SLIDER,
          label: 'Grid border size',
          min: 0,
          max: 10,
          value: 2
        }
      ]
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
