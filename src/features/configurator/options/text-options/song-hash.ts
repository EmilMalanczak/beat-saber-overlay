import { SongHash } from 'features/configurator/elements/text-elements/song-hash'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Song hash',
  slug: 'song-hash',
  component: SongHash,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'beatsaver unique id',
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
