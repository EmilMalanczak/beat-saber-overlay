import { SongName } from 'features/configurator/elements/text-elements/song-name'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Song name',
  slug: 'song-name',
  component: SongName,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: '',
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
