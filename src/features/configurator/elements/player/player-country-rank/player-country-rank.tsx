import { VFC } from 'react'

import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'
import { usePlayerStore } from 'features/scoresaber/player'

export const PlayerCountryRank: VFC<TextCoreProps> = (props) => {
  const rank = usePlayerStore((state) => state.player?.countryRank)

  return <TextCore {...props}>{`#${rank}`}</TextCore>
}
