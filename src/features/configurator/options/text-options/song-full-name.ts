import { SongFullName } from 'features/configurator/elements/text-elements/song-full-name'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Song full name',
  slug: 'song-full-name',
  component: SongFullName,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'Song name with author',
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
