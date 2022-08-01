import { VFC } from 'react'

import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'
import { usePlayerStore } from 'features/scoresaber/player'

export const PlayerAverageAcc: VFC<TextCoreProps> = ({ ...props }) => {
  const averageAcc = usePlayerStore((state) => state.player?.averageAcc)

  return <TextCore {...props}>{`${averageAcc}%`}</TextCore>
}
