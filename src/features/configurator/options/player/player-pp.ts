import { PlayerPP } from 'features/configurator/elements/player/player-pp'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'PP',
  description: 'Your pp score',
  tags: ['scoresaber'],
  slug: 'player-pp',
  component: PlayerPP,
  category: 'player',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
