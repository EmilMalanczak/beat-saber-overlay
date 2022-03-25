import { Option } from '../types/Options'
import type { ComponentOptions } from '../types/Options'
import { AccuracyPercentage } from '../components/AccuracyPercentage'

export const options: ComponentOptions = {
  name: 'Accuracy percentage',
  slug: 'accuracy-percentage',
  component: AccuracyPercentage,
  category: 'performance',
  order: 0,
  image: '',
  description: 'Display cuts from the game',
  options: [
    {
      id: 'font-size',
      propName: 'size',
      inputTypeName: Option.SLIDER,
      label: 'Font size',
      //   description: 'size of each note',
      min: 6,
      max: 32,
      value: 14
    },
    {
      id: 'font-weight',
      propName: 'weight',
      inputTypeName: Option.SLIDER,
      label: 'Font weight',
      //   description: 'size of each note',
      min: 300,
      max: 900,
      step: 100,
      value: 400
    }
  ]
}
