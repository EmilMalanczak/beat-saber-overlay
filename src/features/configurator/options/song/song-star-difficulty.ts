import { SongStarDifficulty } from 'features/configurator/elements/song/song-stars-difficulty'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Stars difficulty',
  description: 'Active song stars',
  tags: ['beatsaver'],
  slug: 'song-star-difficulty',
  component: SongStarDifficulty,
  category: 'song',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
