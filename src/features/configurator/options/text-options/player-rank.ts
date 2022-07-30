import { PlayerRank } from 'features/configurator/elements/text-elements/player-rank'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Player rank',
  slug: 'player-rank',
  component: PlayerRank,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'active score',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
