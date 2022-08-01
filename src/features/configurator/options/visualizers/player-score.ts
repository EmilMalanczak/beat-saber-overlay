import { PlayerScore } from 'features/configurator/elements/visualizers/player-score'
import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Score',
  description: 'Live score',
  tags: ['dynamic'],
  slug: 'player-score',
  component: PlayerScore,
  category: 'visualizer',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [
    ...getTextOptions(),
    {
      id: 'health-amount-animated',
      propName: 'animated',
      inputTypeName: Option.TOGGLE,
      label: 'Animated',
      value: true
    }
  ]
}
