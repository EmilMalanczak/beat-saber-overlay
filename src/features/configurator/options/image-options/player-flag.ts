import { PlayerFlag } from 'features/configurator/elements/image-elements/player-flag'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getImageOptions } from '../common/image-props'

export const options: ComponentOptions = {
  name: 'Player flag',
  slug: 'player-flag',
  component: PlayerFlag,
  category: 'performance',
  order: 0,
  image: '',
  unique: true,
  description: 'Display player name',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getImageOptions()]
}
