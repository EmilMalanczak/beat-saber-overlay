import { CustomText } from 'components/CustomText'
import { ComponentOptions, ScreenType, Option } from 'types/Options'

import { getTextOptions } from './common/text-props'

export const options: ComponentOptions = {
  name: 'Custom text',
  slug: 'custom-text',
  component: CustomText,
  category: 'other',
  order: 0,
  image: '',
  unique: false,
  description: 'Show custom text',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [
    {
      id: 'text-content',
      propName: 'children',
      inputTypeName: Option.TEXT,
      label: 'Text',
      value: ''
    },
    ...getTextOptions()
  ]
}
