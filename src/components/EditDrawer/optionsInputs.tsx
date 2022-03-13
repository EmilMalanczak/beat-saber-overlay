import { NumberInput, ColorInput, Switch, Slider as MSlider, InputWrapper } from '@mantine/core'
import { Option } from '../../types/Options'

type Handler = (...values: any[]) => void

const defaultHandler: Handler = (value) => value

const Slider = ({ label, description, ...props }: any) => (
  <InputWrapper label={label} description={description}>
    <MSlider {...props} />
  </InputWrapper>
)

export const optionsInputs: Record<
  Option,
  {
    component: any
    // just to avoid potential scenario like onChange => (e, value) => {}
    handler: Handler
  }
> = {
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
  [Option.OBJECT]: {
    component: NumberInput,
    handler: defaultHandler
  },
  [Option.SCORE_VISUALIZER_CONFIG]: {
    component: NumberInput,
    handler: defaultHandler
  },
  [Option.SELECT]: {
    component: NumberInput,
    handler: defaultHandler
  },
  [Option.SLIDER]: {
    component: Slider,
    handler: defaultHandler
  },
  [Option.TOGGLE]: {
    component: Switch,
    handler: defaultHandler
  },
  [Option.TOGGLE_COMPONENTS]: {
    component: Switch,
    handler: defaultHandler
  }
}
