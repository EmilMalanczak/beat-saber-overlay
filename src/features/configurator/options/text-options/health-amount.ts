import { HealthAmount } from 'features/configurator/elements/text-elements/health-amount/health-amount'
import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Health amount',
  slug: 'health-amount',
  component: HealthAmount,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'health left in the game',
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
