import { PlayerRank } from 'features/configurator/elements/player/player-rank'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Global rank',
  description: 'Your global rank',
  tags: ['scoresaber'],
  slug: 'player-rank',
  component: PlayerRank,
  category: 'player',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
