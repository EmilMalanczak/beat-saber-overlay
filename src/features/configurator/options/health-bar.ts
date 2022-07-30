import { ComponentOptions, ScreenType, Option } from 'features/configurator/options/types/options'

import { HealthBar } from '../elements/health-bar/health-bar'

export const options: ComponentOptions = {
  name: 'Health bar',
  slug: 'health-bar',
  component: HealthBar,
  category: 'visualizers',
  order: 0,
  image: '',
  unique: true,
  description: 'Display player health',
  screen: [ScreenType.InGame],
  options: [
    {
      id: 'bar-direction',
      propName: 'direction',
      inputTypeName: Option.SELECT,
      label: 'Direction',
      description: 'size of each note',
      value: 'right',
      data: ['right', 'left', 'up', 'down']
    },
    {
      id: 'bar-width',
      propName: 'width',
      inputTypeName: Option.NUMBER,
      label: 'Width',
      min: 0,
      max: 1000,
      value: 300
    },
    {
      id: 'bar-height',
      propName: 'height',
      inputTypeName: Option.NUMBER,
      label: 'Height',
      min: 0,
      max: 1000,
      value: 20
    },

    {
      id: 'bar-color-filled',
      propName: 'barColorFilled',
      inputTypeName: Option.COLOR,
      format: 'rgba',
      label: 'Bar filled color',
      description: 'Color of the health left',
      value: 'rgba(40, 142, 210, 1)'
    },

    {
      id: 'bar-color-background',
      propName: 'barBackgroundColor',
      inputTypeName: Option.COLOR,
      format: 'rgba',
      label: 'Bar background color',
      description: 'Color of the missing health',
      value: 'rgba(255, 255, 255, 0.05)'
    },

    {
      id: 'bar-border-radius',
      propName: 'borderRadius',
      inputTypeName: Option.NUMBER,
      label: 'Border radius',
      min: 0,
      max: 150,
      value: 8
    },
    {
      id: 'bar-animated',
      propName: 'animated',
      inputTypeName: Option.TOGGLE,
      label: 'Animated',
      value: true
    }
  ]
}
