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
  TOGGLE_COMPONENTS,
  DYNAMIC_OPTIONS
}

export enum ScreenType {
  InGame = 'in-game',
  Lobby = 'lobby'
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
  | OptionsBase<Option.TOGGLE, Omit<SwitchProps, 'checked' | 'value'> & { value: boolean }>
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

export type DynamicPropOptions = InputWrapperBaseProps & {
  id: string
  inputTypeName: Option.DYNAMIC_OPTIONS
  schema: PropOptions[]
  propName: string
  value: Record<string, any>[]
}

export type OptionsType = PropOptions | TogglePropOptions | DynamicPropOptions

export type ComponentOptions = {
  name: string
  slug: string
  category: string
  order: number
  image: string
  unique: boolean
  description: string
  screen: ScreenType[]
  options: OptionsType[]
  component: any
}
