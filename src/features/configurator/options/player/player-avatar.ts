import { PlayerAvatar } from 'features/configurator/elements/player/player-avatar'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getImageOptions } from '../core/image-props'

export const options: ComponentOptions = {
  name: 'Avatar',
  description: 'Scoresaber avatar image',
  tags: ['scoresaber'],
  slug: 'player-avatar',
  component: PlayerAvatar,
  category: 'player',
  order: 0,
  image: '',
  unique: false,
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getImageOptions({}, { square: true })]
}
