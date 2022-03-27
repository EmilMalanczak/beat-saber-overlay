import { VFC } from 'react'
import { useConfiguratorStoreBare } from '../../store/configurator'
import { TextCore, TextCoreProps } from '../TextCore/TextCore'

export const AccuracyPercentage: VFC<TextCoreProps> = (props) => {
  const x = useConfiguratorStoreBare()

  return <TextCore {...props}>91.5%</TextCore>
}
