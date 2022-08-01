import { VFC } from 'react'

import { useSongStore } from 'features/beatsaver/song'
import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'

export const SongHash: VFC<TextCoreProps> = (props) => {
  const hash = useSongStore((state) => state.song?.hash)

  return <TextCore {...props}>{`!bsr ${hash}`}</TextCore>
}
