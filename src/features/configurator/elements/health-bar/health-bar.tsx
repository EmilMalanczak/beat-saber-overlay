import { CSSProperties } from 'react'
import { useSpring, animated } from 'react-spring'

import { useScoreStore } from 'features/socket/store/score'

import classes from './health-bar.module.scss'
import { transformBarClipPath } from './transform-bar-clip-path'

export type HealthBarProps = {
  width: number
  height: number
  animated: boolean
  barBackgroundColor: string
  barColorFilled: string
  direction: 'up' | 'down' | 'left' | 'right'
  borderRadius: number
}

export const HealthBar = ({
  barBackgroundColor,
  barColorFilled,
  width,
  height,
  animated: barAnimated,
  direction,
  borderRadius
}: HealthBarProps) => {
  const health = useScoreStore((state) => state.health)

  const { clip } = useSpring({
    clip: health,
    immediate: !barAnimated
  })

  return (
    <div
      className={classes.bar}
      style={
        {
          '--bar-width': `${width}px`,
          '--bar-height': `${height}px`,
          '--bar-background-color': barBackgroundColor,
          '--bar-color-filled': barColorFilled,
          '--bar-border-radius': borderRadius
        } as CSSProperties
      }
    >
      <animated.div
        className={classes.barFilled}
        style={{
          clipPath: clip.to((x) => transformBarClipPath(typeof x === 'number' ? x : 0, direction))
        }}
      />
    </div>
  )
}
