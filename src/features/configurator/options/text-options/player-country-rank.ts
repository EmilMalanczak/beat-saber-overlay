import { PlayerCountryRank } from 'features/configurator/elements/text-elements/player-country-rank'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Player country rank',
  slug: 'player-country-rank',
  component: PlayerCountryRank,
  category: 'player',
  order: 0,
  image: '',
  unique: true,
  description: 'active score',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
