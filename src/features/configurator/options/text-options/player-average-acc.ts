import { PlayerAverageAcc } from 'features/configurator/elements/text-elements/player-average-acc'
import { PlayerRank } from 'features/configurator/elements/text-elements/player-rank'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Player average accuracy',
  slug: 'player-average-acc',
  component: PlayerAverageAcc,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'Display player average accuracy percentage',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
