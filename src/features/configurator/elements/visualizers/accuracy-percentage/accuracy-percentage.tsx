import { VFC } from 'react'

import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'
import { useScoreStore } from 'features/socket/store/score'

export const AccuracyPercentage: VFC<TextCoreProps> = (props) => {
  const accuracy = useScoreStore((state) => state.accuracy)

  return <TextCore {...props}>{`${accuracy}%`}</TextCore>
}
