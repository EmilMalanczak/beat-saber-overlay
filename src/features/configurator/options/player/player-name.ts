import { PlayerName } from 'features/configurator/elements/player/player-name'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Name',
  description: 'Scoresaber ranking name',
  tags: ['scoresaber'],
  slug: 'player-name',
  component: PlayerName,
  category: 'player',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
