import { PlayerFlag } from 'features/configurator/elements/player/player-flag'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getImageOptions } from '../core/image-props'

export const options: ComponentOptions = {
  name: 'Country flag',
  description: 'Flag of your country',
  tags: ['scoresaber'],
  slug: 'player-flag',
  component: PlayerFlag,
  category: 'player',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getImageOptions()]
}
