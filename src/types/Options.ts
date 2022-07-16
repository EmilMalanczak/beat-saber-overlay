import type {
  ColorInputProps,
  HueSliderProps,
  InputWrapperBaseProps,
  NumberInputProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TextInputProps
} from '@mantine/core'

export enum Option {
  NUMBER,
  SLIDER,
  CODE,
  OBJECT,
  SELECT,
  COLOR,
  HUE,
  TEXT,
  SCORE_VISUALIZER_CONFIG,
  TOGGLE,
  TOGGLE_COMPONENTS
}

// eslint-disable-next-line @typescript-eslint/ban-types
type OptionsBase<N extends Option, Props extends object = {}> = {
  id: string
  inputTypeName: N
  propName: string
} & Props

type PropOptions =
  | OptionsBase<Option.NUMBER, NumberInputProps>
  | OptionsBase<Option.SELECT, SelectProps>
  | OptionsBase<Option.COLOR, ColorInputProps>
  | OptionsBase<Option.HUE, InputWrapperBaseProps & Omit<HueSliderProps, 'onChange'>>
  | OptionsBase<Option.SLIDER, InputWrapperBaseProps & SliderProps>
  | OptionsBase<Option.TOGGLE, SwitchProps>
  | OptionsBase<Option.TEXT, TextInputProps>

type ToggleOptions = PropOptions & {
  visibleWhenChecked: boolean
  uncheckedValue?: any
  checkedValue?: any
}

export type TogglePropOptions = {
  id: string
  inputTypeName: Option.TOGGLE_COMPONENTS
  options: ToggleOptions[]
} & SwitchProps

type OptionsType = PropOptions | TogglePropOptions

export type ComponentOptions = {
  name: string
  slug: string
  category: string
  order: number
  image: string
  description: string
  options: OptionsType[]
  component: any
}
