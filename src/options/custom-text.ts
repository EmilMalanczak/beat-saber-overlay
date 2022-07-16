import type { ComponentOptions } from 'types/Options'

import { CustomText } from 'components/CustomText'
import { Option } from 'types/Options'

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
