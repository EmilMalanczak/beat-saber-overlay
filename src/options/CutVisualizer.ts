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
      id: 'cell-size',
      propName: 'cellSize',
      inputTypeName: Option.SLIDER,
      label: 'Size',
      description: 'size of each note',
      min: 10,
      max: 300,
      value: 70
    },
    {
      id: 'fade-time',
      propName: 'fadeTime',
      inputTypeName: Option.NUMBER,
      label: 'Fade',
      description: 'time in ms after the note disappear',
      min: 0,
      max: 1000,
      value: 300
    },
    {
      id: 'grid-show-toggle',
      inputTypeName: Option.TOGGLE_COMPONENTS,
      label: 'Show grid',
      checked: true,
      options: [
        {
          visibleWhenChecked: true,
          uncheckedValue: 'rgba(255, 255, 255, 1)',
          id: 'grid-color',
          propName: 'gridColor',
          inputTypeName: Option.COLOR,
          format: 'rgba',
          label: 'Grid color',
          value: 'rgba(255, 255, 255, 1)'
        },
        {
          visibleWhenChecked: true,
          uncheckedValue: 0,
          checkedValue: 1,
          id: 'grid-border-size',
          propName: 'gridBorderSize',
          inputTypeName: Option.SLIDER,
          label: 'Grid border size',
          min: 0,
          max: 10,
          value: 0
        }
      ]
    }
  ]
}
