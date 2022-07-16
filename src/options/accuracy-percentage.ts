import type { ComponentOptions } from 'types/Options'

import { AccuracyPercentage } from 'components/AccuracyPercentage'

import { getTextOptions } from './common/text-props'

export const options: ComponentOptions = {
  name: 'Accuracy percentage',
  slug: 'accuracy-percentage',
  component: AccuracyPercentage,
  category: 'performance',
  order: 0,
  image: '',
  unique: true,
  description: 'Display cuts from the game',
  options: [...getTextOptions()]
}
