import type { VFC } from 'react'

import { useStyles } from './guide-line.styles'

enum Direction {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom'
}

type GuideLineProps = {
  direction: keyof typeof Direction
  value: number
  zoom: number
}

export const GuideLine: VFC<GuideLineProps> = ({ value, direction, zoom }) => {
  const { classes, cx } = useStyles({ zoom })

  return (
    <div
      className={cx(classes.offset, classes[direction], {
        [classes.horizontal]: direction === Direction.left || direction === Direction.right,
        [classes.vertical]: direction === Direction.top || direction === Direction.bottom
      })}
    >
      {value > 0 && <span>{value}</span>}
    </div>
  )
}
