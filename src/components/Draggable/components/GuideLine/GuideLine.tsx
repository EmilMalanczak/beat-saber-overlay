import { VFC } from 'react'
import { useStyles } from './GuideLine.styles'

enum Direction {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom'
}

type GuideLineProps = {
  direction: keyof typeof Direction
  value: number
}

export const GuideLine: VFC<GuideLineProps> = ({ value, direction }) => {
  const { classes, cx } = useStyles()

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
