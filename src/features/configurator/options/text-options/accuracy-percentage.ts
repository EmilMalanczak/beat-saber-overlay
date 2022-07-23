import { AccuracyPercentage } from 'features/configurator/elements/text-elements/accuracy-percentage'
import { ComponentOptions, ScreenType } from 'features/configurator/options/types/options'

import { getTextOptions } from '../common/text-props'

export const options: ComponentOptions = {
  name: 'Accuracy percentage',
  slug: 'accuracy-percentage',
  component: AccuracyPercentage,
  category: 'performance',
  order: 0,
  image: '',
  unique: true,
  description: 'Display cuts from the game',
  screen: [ScreenType.InGame, ScreenType.Lobby],
  options: [...getTextOptions()]
}
