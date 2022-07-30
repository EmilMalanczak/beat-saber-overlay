import { SongAuthor } from 'features/configurator/elements/text-elements/song-author'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Song author',
  slug: 'song-author',
  component: SongAuthor,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'Author of the song',
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
