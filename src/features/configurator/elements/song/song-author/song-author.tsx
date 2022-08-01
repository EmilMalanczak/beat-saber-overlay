import { VFC } from 'react'

import { useSongStore } from 'features/beatsaver/song'
import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'

export const SongAuthor: VFC<TextCoreProps> = (props) => {
  const author = useSongStore((state) => state.song?.author)

  return <TextCore {...props}>{author}</TextCore>
}
