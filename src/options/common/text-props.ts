import type { ComponentOptions } from 'types/Options'

import { NUMBER_FONT_FAMILIES } from 'constants/ui'
import { Option } from 'types/Options'

type PropNames = 'size' | 'weight' | 'font'

export const textOptions = (
  defaultValues: Partial<Record<PropNames, unknown>> = {}
): ComponentOptions['options'] => {
  const { size = 14, weight = 400, font = 'Montserrat Alternates' } = defaultValues

  return [
    {
      id: 'font-size',
      propName: 'size',
      inputTypeName: Option.SLIDER,
      label: 'Font size',
      //   description: 'size of each note',
      min: 6,
      max: 32,
      value: size as number
    },
    {
      id: 'font-weight',
      propName: 'weight',
      inputTypeName: Option.SLIDER,
      label: 'Font weight',
      min: 300,
      max: 900,
      step: 100,
      value: weight as number
    },
    {
      id: 'font-family',
      propName: 'font',
      inputTypeName: Option.SELECT,
      label: 'Font',
      data: NUMBER_FONT_FAMILIES,
      value: font as string,
      placeholder: 'Pick one'
    }
  ]
}
