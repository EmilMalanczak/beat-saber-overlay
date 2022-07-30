import { SongHash } from 'features/configurator/elements/text-elements/song-hash'
import { SongMapper } from 'features/configurator/elements/text-elements/song-mapper'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Song mapper',
  slug: 'song-mapper',
  component: SongMapper,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'Person who mapped the song',
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
