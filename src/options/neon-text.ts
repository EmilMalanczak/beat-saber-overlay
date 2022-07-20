import { NeonText } from 'components/NeonText'
import { ComponentOptions, ScreenType, Option } from 'types/Options'

export const options: ComponentOptions = {
  name: 'Neon text',
  slug: 'neon-text',
  component: NeonText,
  category: 'other',
  order: 0,
  image: '',
  unique: false,
  description: 'Show neon text',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [
    {
      id: 'text-content',
      propName: 'children',
      inputTypeName: Option.TEXT,
      label: 'Text',
      value: ''
    },
    {
      id: 'neon-color',
      propName: 'hue',
      inputTypeName: Option.HUE,
      label: 'Neon color',
      value: 0
    },
    {
      id: 'neon-intensity',
      propName: 'intensity',
      inputTypeName: Option.SLIDER,
      label: 'Intensity',
      min: 0,
      max: 100,
      value: 80
    },
    {
      id: 'font-size',
      propName: 'size',
      inputTypeName: Option.SLIDER,
      label: 'Font size',
      min: 12,
      max: 60,
      value: 60
    }
  ]
}
