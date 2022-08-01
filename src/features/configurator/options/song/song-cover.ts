import { SongCover } from 'features/configurator/elements/song/song-cover'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getImageOptions } from '../core/image-props'

export const options: ComponentOptions = {
  name: 'Cover',
  description: 'Beatsaver cover avatar',
  tags: ['beatsaver'],
  slug: 'song-cover',
  component: SongCover,
  category: 'song',
  order: 0,
  image: '',
  unique: false,
  screen: [ScreenType.InGame],
  options: [...getImageOptions({}, { square: true })]
}
