import { SongHash } from 'features/configurator/elements/song/song-hash'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Hash',
  description: '!bsr song code',
  tags: ['beatsaver'],
  slug: 'song-hash',
  component: SongHash,
  category: 'song',
  order: 0,
  image: '',
  unique: true,
  screen: [ScreenType.InGame],
  options: [...getTextOptions()]
}
