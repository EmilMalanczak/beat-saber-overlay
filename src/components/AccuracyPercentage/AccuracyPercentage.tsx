import { VFC } from 'react'

import { TextCore, TextCoreProps } from 'components/TextCore'
import { useConfiguratorStoreBare } from 'store/configurator'

export const AccuracyPercentage: VFC<TextCoreProps> = (props) => {
  const x = useConfiguratorStoreBare()

  return <TextCore {...props}>91.5%</TextCore>
}
