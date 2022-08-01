import { Badge, BadgeProps, MantineSize } from '@mantine/core'
import { readableColor } from 'polished'
import { VFC } from 'react'

import { useSongStore } from 'features/beatsaver/song'

import { transformDifficultyBaseName } from './transform-difficulty-base-name'

type SongDifficultyBadgeProps = BadgeProps<'div'> & {
  size: MantineSize
  showCustomName: boolean
  backgroundColor: string
  borderRadius: number
}

export const SongDifficultyBadge: VFC<SongDifficultyBadgeProps> = ({
  showCustomName,
  style,
  backgroundColor,
  borderRadius,
  ...props
}) => {
  const [difficulty, customDifficulty] = useSongStore((state) => [
    state.difficulty.base,
    state.difficulty.custom
  ])

  console.log(backgroundColor)

  return (
    <Badge
      style={{
        backgroundColor,
        borderRadius,
        // TODO fix weird null value at some point
        color: backgroundColor ? readableColor(backgroundColor) : 'inherit',
        ...style
      }}
      {...props}
    >
      {showCustomName && customDifficulty
        ? customDifficulty
        : transformDifficultyBaseName(difficulty)}
    </Badge>
  )
}
