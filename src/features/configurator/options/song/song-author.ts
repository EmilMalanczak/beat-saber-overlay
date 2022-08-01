import { SongAuthor } from 'features/configurator/elements/song/song-author'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Author',
  description: 'Author of the song',
  tags: ['beatsaver'],
  slug: 'song-author',
  component: SongAuthor,
  category: 'song',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
