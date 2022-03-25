import { VFC } from 'react'
import { useConfiguratorStoreBare } from '../../store/configurator'
import { TextCore } from '../TextCore/TextCore'

export const AccuracyPercentage: VFC = (props) => {
  const x = useConfiguratorStoreBare()

  return <TextCore {...props}>91.5%</TextCore>
}
