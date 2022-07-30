import { VFC } from 'react'

import { TextCore, TextCoreProps } from 'features/configurator/elements/text-elements/text-core'
import { usePlayerStore } from 'features/scoresaber/player'

export const PlayerPP: VFC<TextCoreProps> = (props) => {
  const pp = usePlayerStore((state) => state.player?.pp)

  return <TextCore {...props}>{`${pp}pp`}</TextCore>
}
