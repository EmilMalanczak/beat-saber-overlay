import { Group } from '@mantine/core'
import { VFC } from 'react'
import { AiFillStar } from 'react-icons/ai'

import { useSongStore } from 'features/beatsaver/song'
import { TextCore, TextCoreProps } from 'features/configurator/elements/text-elements/text-core'

export const SongStarDifficulty: VFC<TextCoreProps> = (props) => {
  // eslint-disable-next-line no-confusing-arrow
  const stars = useSongStore((state) =>
    state.difficulty.base && state.song?.difficulty
      ? state.song.difficulty[state.difficulty.base]?.stars
      : ''
  )

  return (
    <TextCore {...props}>
      {stars ? (
        <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <span>{stars}</span>
          <AiFillStar />
        </span>
      ) : null}
    </TextCore>
  )
}
