import { Skeleton } from '@mantine/core'
import { VFC } from 'react'

import { useSongStore } from 'features/beatsaver/song'

import { ImageCore } from '../image-core'
import { ImageCoreProps } from '../image-core/image-core'

export const SongCover: VFC<ImageCoreProps> = ({ size, width, height, radius, ...props }) => {
  const { src, loading, fetched } = useSongStore((state) => ({
    src: state.song?.cover,
    loading: state.loading,
    fetched: state.fetched
  }))

  return !fetched && loading ? (
    <Skeleton width={width || size} height={height || size} radius={radius} />
  ) : (
    <ImageCore
      withPlaceholder
      size={size}
      width={width}
      height={height}
      src={src}
      radius={radius}
      {...props}
    />
  )
}
