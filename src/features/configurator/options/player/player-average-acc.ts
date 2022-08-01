import { PlayerAverageAcc } from 'features/configurator/elements/player/player-average-acc'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Average accuracy',
  description: 'displayed as percentage',
  slug: 'player-average-acc',
  tags: ['scoresaber'],
  component: PlayerAverageAcc,
  category: 'player',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
