import { SongMapper } from 'features/configurator/elements/song/song-mapper'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Mapper',
  description: 'Creator of the map',
  slug: 'song-mapper',
  tags: ['beatsaver'],
  component: SongMapper,
  category: 'song',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
