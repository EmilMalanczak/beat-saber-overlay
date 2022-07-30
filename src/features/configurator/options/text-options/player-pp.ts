import { PlayerPP } from 'features/configurator/elements/text-elements/player-pp'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Player pp score',
  slug: 'player-pp',
  component: PlayerPP,
  category: 'performance',
  order: 0,
  image: '',
  unique: true,
  description: 'Display pp ranking score',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
