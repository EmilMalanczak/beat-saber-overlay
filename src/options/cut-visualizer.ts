import { CutVisualizer } from 'components/CutVisualizer'
import { ComponentOptions, ScreenType, Option } from 'types/Options'

export const options: ComponentOptions = {
  name: 'CutVisualizer',
  slug: 'cut-visualizer',
  component: CutVisualizer,
  category: 'visualizers',
  order: 0,
  image: '',
  unique: true,
  description: 'Display cuts from the game',
  screen: [ScreenType.InGame],
  options: [
    {
      id: 'cell-size',
      propName: 'cellSize',
      inputTypeName: Option.SLIDER,
      label: 'Size',
      description: 'size of each note',
      min: 10,
      max: 140,
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
      checked: false,
      options: [
        {
          visibleWhenChecked: true,
          uncheckedValue: 'rgba(255, 255, 255, 0.08)',
          id: 'grid-color',
          propName: 'gridColor',
          inputTypeName: Option.COLOR,
          format: 'rgba',
          label: 'Grid color',
          value: 'rgba(255, 255, 255, 0.08)'
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
