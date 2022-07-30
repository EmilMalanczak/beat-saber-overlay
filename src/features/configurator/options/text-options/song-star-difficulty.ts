import { SongStarDifficulty } from 'features/configurator/elements/text-elements/song-stars-difficulty'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Song stars difficulty',
  slug: 'song-star-difficulty',
  component: SongStarDifficulty,
  category: 'score',
  order: 0,
  image: '',
  unique: true,
  description: 'Person who mapped the song',
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
