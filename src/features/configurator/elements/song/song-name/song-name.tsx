import { VFC } from 'react'

import { useSongStore } from 'features/beatsaver/song'
import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'

export const SongName: VFC<TextCoreProps> = (props) => {
  const name = useSongStore((state) => state.song?.name)

  return <TextCore {...props}>{name}</TextCore>
}
