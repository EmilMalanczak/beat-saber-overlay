import { HealthAmount } from 'features/configurator/elements/visualizers/health-amount/health-amount'
import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Health',
  description: 'HP left as percentage',
  tags: ['dynamic'],
  slug: 'health-amount',
  component: HealthAmount,
  category: 'visualizer',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [
    ...getTextOptions(),
    {
      id: 'player-score-animated',
      propName: 'animated',
      inputTypeName: Option.TOGGLE,
      label: 'Animated',
      value: true
    }
  ]
}
