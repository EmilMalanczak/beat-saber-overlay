import { SongCover } from 'features/configurator/elements/image-elements/song-cover'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getImageOptions } from '../common/image-props'

export const options: ComponentOptions = {
  name: 'Song cover',
  slug: 'song-cover',
  component: SongCover,
  category: 'other',
  order: 0,
  image: '',
  unique: false,
  description: 'Display current song avatar',
  screen: [ScreenType.InGame],
  options: [...getImageOptions({}, { square: true })]
}
