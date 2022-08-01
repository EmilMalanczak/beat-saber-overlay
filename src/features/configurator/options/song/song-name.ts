import { SongName } from 'features/configurator/elements/song/song-name'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Name',
  description: 'Song name',
  tags: ['beatsaver'],
  slug: 'song-name',
  component: SongName,
  category: 'song',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
