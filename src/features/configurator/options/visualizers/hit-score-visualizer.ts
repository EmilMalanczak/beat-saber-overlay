import { HitScoreVisualizer } from 'features/configurator/elements/visualizers/hit-score-visualizer'
import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

export type HitScoreConfig = Array<{
  above: number
  color: string
  fontSize: number
  [key: string]: any
}>

export type HitScoreSharedProps = {
  unmountTime: number
  config: HitScoreConfig
  scoreCutShift: number
  maxRotate: number
}
export const options: ComponentOptions = {
  name: 'Hit score visualizer',
  description: 'Display score per each cut',
  tags: ['dynamic'],
  slug: 'score-visualizer',
  component: HitScoreVisualizer,
  category: 'visualizer',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [
    {
      id: 'row-height',
      propName: 'rowHeight',
      inputTypeName: Option.NUMBER,
      label: 'Row height',
      description: 'height of each row',
      min: 0,
      max: 300,
      value: Math.round(70 + (Math.SQRT2 - 1.08) * 70)
    },
    {
      id: 'width',
      propName: 'width',
      inputTypeName: Option.NUMBER,
      label: 'Width',
      description: 'total width of the visualizer',
      min: 0,
      max: 1000,
      value: 300
    },
    {
      id: 'row-count',
      propName: 'rows',
      inputTypeName: Option.SELECT,
      label: 'Amount of rows',
      data: ['1', '3'],
      value: '3',
      placeholder: 'Pick one'
    },
    {
      id: 'unmount-time',
      propName: 'unmountTime',
      inputTypeName: Option.NUMBER,
      label: 'Unmount time',
      description: 'time in ms after the score disappear',
      min: 0,
      max: 1000,
      value: 300
    },
    {
      id: 'score-cut-shift',
      propName: 'scoreCutShift',
      inputTypeName: Option.NUMBER,
      label: 'Score cut shift',
      description: 'distance of score cut shift',
      min: 0,
      max: 100,
      value: 10
    },
    {
      id: 'max-rotate',
      propName: 'maxRotate',
      inputTypeName: Option.NUMBER,
      label: 'Max rotate',
      description: 'max angle of rotation',
      min: 0,
      max: 360,
      value: 12
    },
    {
      id: 'score-color-config',
      propName: 'config',
      inputTypeName: Option.DYNAMIC_OPTIONS,
      label: 'Color config',
      schema: [
        {
          id: 'above',
          propName: 'above',
          inputTypeName: Option.NUMBER,
          label: 'Above',
          min: 0,
          max: 115,
          value: 110
        },
        {
          id: 'font-size',
          propName: 'fontSize',
          inputTypeName: Option.SLIDER,
          label: 'Font size',
          min: 6,
          max: 32,
          value: 32
        },
        {
          id: 'score-color',
          propName: 'color',
          inputTypeName: Option.COLOR,
          format: 'rgba',
          label: 'Score color',
          value: 'rgba(255, 255, 255, 1)'
        }
      ],
      value: [
        {
          above: 113,
          fontSize: 60,
          color: 'rgba(255, 255, 255, 1)'
        },
        {
          above: 110,
          fontSize: 58,
          color: 'rgba(242, 0, 242,1)'
        },
        {
          above: 107,
          fontSize: 56,
          color: 'rgba(0, 102, 255, 1)'
        },
        {
          above: 100,
          fontSize: 54,
          color: 'rgba(242, 242, 0, 1)'
        },
        {
          above: 0,
          fontSize: 52,
          color: 'rgba(255, 102, 0, 1)'
        }
      ]
    }
  ]
}
