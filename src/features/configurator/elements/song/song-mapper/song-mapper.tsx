import { VFC } from 'react'

import { useSongStore } from 'features/beatsaver/song'
import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'

export const SongMapper: VFC<TextCoreProps> = (props) => {
  const mapper = useSongStore((state) => state.song?.mapper)

  return <TextCore {...props}>{mapper}</TextCore>
}
