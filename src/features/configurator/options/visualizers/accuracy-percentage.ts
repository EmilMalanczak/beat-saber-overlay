import { AccuracyPercentage } from 'features/configurator/elements/visualizers/accuracy-percentage'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Accuracy',
  description: 'Live accuracy score',
  tags: ['dynamic'],
  slug: 'accuracy-percentage',
  component: AccuracyPercentage,
  category: 'visualizer',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
