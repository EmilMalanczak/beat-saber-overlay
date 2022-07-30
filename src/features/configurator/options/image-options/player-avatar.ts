import { PlayerAvatar } from 'features/configurator/elements/image-elements/player-avatar'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getImageOptions } from '../common/image-props'

export const options: ComponentOptions = {
  name: 'Player avatar',
  slug: 'player-avatar',
  component: PlayerAvatar,
  category: 'other',
  order: 0,
  image: '',
  unique: false,
  description: 'Display scoresaber avatar image',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getImageOptions({}, { square: true })]
}
