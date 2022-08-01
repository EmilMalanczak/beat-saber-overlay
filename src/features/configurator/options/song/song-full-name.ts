import { SongFullName } from 'features/configurator/elements/song/song-full-name'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Full name',
  description: 'Song name with author',
  tags: ['beatsaver'],
  slug: 'song-full-name',
  component: SongFullName,
  category: 'song',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
