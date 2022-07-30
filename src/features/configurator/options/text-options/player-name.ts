import { PlayerName } from 'features/configurator/elements/text-elements/player-name'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Player name',
  slug: 'player-name',
  component: PlayerName,
  category: 'performance',
  order: 0,
  image: '',
  unique: true,
  description: 'Display player name',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
