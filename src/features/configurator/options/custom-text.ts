import { CustomText } from 'features/configurator/elements/custom-text'
import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

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
