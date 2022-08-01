import { Skeleton } from '@mantine/core'
import { VFC } from 'react'

import { usePlayerStore } from 'features/scoresaber/player'

import { ImageCore } from '../../core/image-core'
import { ImageCoreProps } from '../../core/image-core/image-core'

export const PlayerAvatar: VFC<ImageCoreProps> = ({ size, radius, ...props }) => {
  const { src, loading, fetched } = usePlayerStore((state) => ({
    src: state.player?.profilePicture,
    loading: state.loading,
    fetched: state.fetched
  }))

  return !fetched && loading ? (
    <Skeleton width={size} height={size} radius={radius} />
  ) : (
    <ImageCore withPlaceholder size={size} src={src} radius={radius} {...props} />
  )
}
