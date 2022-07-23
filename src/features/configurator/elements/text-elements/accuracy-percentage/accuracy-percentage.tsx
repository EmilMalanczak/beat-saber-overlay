import { VFC } from 'react'

import { TextCore, TextCoreProps } from 'features/configurator/elements/text-elements/text-core'
import { useConfiguratorStoreBare } from 'features/configurator/store/configurator'

export const AccuracyPercentage: VFC<TextCoreProps> = (props) => {
  const x = useConfiguratorStoreBare()

  return <TextCore {...props}>91.5%</TextCore>
}
