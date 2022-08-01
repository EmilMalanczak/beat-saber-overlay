import { CustomText } from 'features/configurator/elements/other/custom-text'
import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

import { getTextOptions } from '../core/text-props'

export const options: ComponentOptions = {
  name: 'Custom text',
  description: 'Create your own text',
  tags: [],
  slug: 'custom-text',
  component: CustomText,
  category: 'other',
  order: 0,
  image: '',
  unique: false,
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
