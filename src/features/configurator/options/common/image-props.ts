import { ComponentOptions, Option } from 'features/configurator/options/types/options'

type PropNames = 'size' | 'radius' | 'height' | 'width' | 'rotation'

// TODO: add support for generic types
export const getImageOptions = (
  defaultValues: Partial<Record<PropNames, unknown>> = {},
  { square }: { square?: boolean } = { square: false }
): ComponentOptions['options'] => {
  const { size = 48, radius = 8, rotation = 0 } = defaultValues

  const sizeOptions: ComponentOptions['options'] = !square
    ? [
        {
          id: 'image-height',
          propName: 'height',
          inputTypeName: Option.SLIDER,
          label: 'Height',
          min: 20,
          max: 120,
          value: size as number
        },
        {
          id: 'image-width',
          propName: 'width',
          inputTypeName: Option.SLIDER,
          label: 'Width',
          min: 20,
          max: 120,
          value: size as number
        }
      ]
    : [
        {
          id: 'image-size',
          propName: 'size',
          inputTypeName: Option.SLIDER,
          label: 'Size',
          min: 20,
          max: 120,
          value: size as number
        }
      ]

  return [
    ...sizeOptions,
    {
      id: 'border-radius',
      propName: 'radius',
      inputTypeName: Option.NUMBER,
      label: 'Border radius',
      value: radius as number,
      min: 0,
      max: 300,
      placeholder: 'Pick one'
    },
    {
      id: 'image-rotation',
      propName: 'rotation',
      inputTypeName: Option.SLIDER,
      label: 'Rotation',
      min: 0,
      max: 360,
      value: rotation as number
    }
  ]
}
