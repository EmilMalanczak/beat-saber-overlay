import {
  NumberInput,
  ColorInput,
  Switch as MSwitch,
  Slider as MSlider,
  HueSlider as MHueSlider,
  InputWrapper,
  Select,
  TextInput
} from '@mantine/core'

import { Option } from 'features/configurator/options/types/options'

import { DynamicOptionsInput } from './dynamic-options-input'

type Handler = (...values: any[]) => void
type OptionObject = {
  component: any
  // just to avoid potential scenario like onChange => (e, value) => {}
  handler: Handler
}

const defaultHandler: Handler = (value) => value

const Slider = ({ label, description, ...props }: any) => (
  <InputWrapper label={label} description={description}>
    <MSlider {...props} />
  </InputWrapper>
)

const Toggle = ({ value, ...props }: any) => <MSwitch checked={value} {...props} />
const HueSlider = ({ label, description, ...props }: any) => (
  <InputWrapper label={label} description={description}>
    <MHueSlider {...props} />
  </InputWrapper>
)

export const optionsInputsBase: Record<Exclude<Option, Option.DYNAMIC_OPTIONS>, OptionObject> = {
  [Option.NUMBER]: {
    component: NumberInput,
    handler: defaultHandler
  },
  [Option.CODE]: {
    component: NumberInput,
    handler: defaultHandler
  },
  [Option.COLOR]: {
    component: ColorInput,
    handler: defaultHandler
  },
  [Option.HUE]: {
    component: HueSlider,
    handler: defaultHandler
  },
  [Option.OBJECT]: {
    component: NumberInput,
    handler: defaultHandler
  },
  [Option.SCORE_VISUALIZER_CONFIG]: {
    component: NumberInput,
    handler: defaultHandler
  },
  [Option.SELECT]: {
    component: Select,
    handler: defaultHandler
  },
  [Option.SLIDER]: {
    component: Slider,
    handler: defaultHandler
  },
  [Option.TOGGLE]: {
    component: Toggle,
    handler: (event) => event.target.checked
  },
  [Option.TEXT]: {
    component: TextInput,
    handler: (event) => event.target.value
  },
  [Option.TOGGLE_COMPONENTS]: {
    component: MSwitch,
    handler: defaultHandler
  }
}

export const getOptionInput = (option: Option): OptionObject => {
  if (option === Option.DYNAMIC_OPTIONS) {
    return {
      component: DynamicOptionsInput,
      handler: defaultHandler
    }
  }

  return optionsInputsBase[option]
}
