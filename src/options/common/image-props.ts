import { DEFAULT_THEME } from '@mantine/styles'

import { ComponentOptions, Option } from 'types/Options'

type PropNames = 'size' | 'radius'

// TODO: add support for generic types
export const getImageOptions = (
  defaultValues: Partial<Record<PropNames, unknown>> = {}
): ComponentOptions['options'] => {
  const { size = 48, radius = 'sm' } = defaultValues

  return [
    {
      id: 'font-size',
      propName: 'size',
      inputTypeName: Option.SLIDER,
      label: 'Size',
      min: 20,
      max: 120,
      value: size as number
    },
    {
      id: 'border-radius',
      propName: 'radius',
      inputTypeName: Option.SELECT,
      label: 'Border radius',
      data: Object.values(DEFAULT_THEME.radius).map((s) => `${s}`),
      value: radius as string,
      placeholder: 'Pick one'
    }
  ]
}
