import { PlayerScore } from 'features/configurator/elements/text-elements/player-score'
import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Player score',
  slug: 'player-score',
  component: PlayerScore,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'active score',
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
