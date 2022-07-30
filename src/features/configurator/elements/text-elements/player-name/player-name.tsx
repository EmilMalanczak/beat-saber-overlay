import { VFC } from 'react'

import { TextCore, TextCoreProps } from 'features/configurator/elements/text-elements/text-core'
import { usePlayerStore } from 'features/scoresaber/player'

export const PlayerName: VFC<TextCoreProps> = (props) => {
  const name = usePlayerStore((state) => state.player?.name)

  return <TextCore {...props}>{name}</TextCore>
}
