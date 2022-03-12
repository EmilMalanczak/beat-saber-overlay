import { NumberInput, ColorInput } from '@mantine/core'
import { Option } from '../../types/Options'

export const optionsInputs: Record<
  Option,
  {
    component: any
    // just to avoid potential scenario like onChange => (e, value) => {}
    handler: (...values: any[]) => void
  }
> = {
  [Option.NUMBER]: {
    component: NumberInput,
    handler: (value) => {
      console.log(value)
      return value
    }
  },
  [Option.CODE]: {
    component: NumberInput,
    handler: (value) => value
  },
  [Option.COLOR]: {
    component: ColorInput,
    handler: (value) => {
      console.log(value)
      return value
    }
  },
  [Option.OBJECT]: {
    component: NumberInput,
    handler: (value) => value
  },
  [Option.SCORE_VISUALIZER_CONFIG]: {
    component: NumberInput,
    handler: (value) => value
  },
  [Option.SELECT]: {
    component: NumberInput,
    handler: (value) => value
  },
  [Option.SLIDER]: {
    component: NumberInput,
    handler: (value) => value
  }
}
