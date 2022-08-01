import { PlayerCountryRank } from 'features/configurator/elements/player/player-country-rank'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Country rank',
  description: 'Your local rank',
  tags: ['scoresaber'],
  slug: 'player-country-rank',
  component: PlayerCountryRank,
  category: 'player',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
