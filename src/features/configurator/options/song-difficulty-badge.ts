import { DEFAULT_THEME } from '@mantine/styles'

import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

import { SongDifficultyBadge } from '../elements/song-difficulty-badge'

export const options: ComponentOptions = {
  name: 'Song difficulty badge',
  slug: 'song-difficulty-badge',
  component: SongDifficultyBadge,
  category: 'visualizers',
  order: 0,
  image: '',
  unique: true,
  description: 'Badge with song difficulty',
  screen: [ScreenType.InGame],
  options: [
    {
      id: 'badge-size',
      propName: 'size',
      inputTypeName: Option.SELECT,
      label: 'Width',
      data: Object.keys(DEFAULT_THEME.spacing).map((s) => `${s}`),
      value: 'sm'
    },
    {
      id: 'bar-color-background',
      propName: 'backgroundColor',
      inputTypeName: Option.COLOR,
      format: 'rgba',
      label: 'Bar background color',
      description: 'Color of the missing health',
      value: 'rgba(255, 255, 255, 1)'
    },
    {
      id: 'badge-border-radius',
      propName: 'borderRadius',
      inputTypeName: Option.NUMBER,
      label: 'Border radius',
      min: 0,
      max: 150,
      value: 8
    },
    {
      id: 'badge-custom-name',
      propName: 'showCustomName',
      inputTypeName: Option.TOGGLE,
      label: 'Show custom difficulty name',
      value: false
    }
  ]
}
