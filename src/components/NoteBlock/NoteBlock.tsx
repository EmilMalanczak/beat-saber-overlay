import type { FC } from 'react'
import { useSpring, animated } from '@react-spring/web'

import { useTimeout } from '../../hooks/useTimeout'
import { NoteCut, useScoreStore } from '../../store/score'
import { useStyles } from './NoteBlock.styles'

export type NoteBlockProps = {
  size: number
  cut: NoteCut
  fadeTime: number
}

export const NoteBlock: FC<NoteBlockProps> = (props) => {
  const { classes } = useStyles(props)
  const { hideCut } = useScoreStore()
  const {
    size,
    fadeTime = 300,
    cut: { active, direction, x, y }
  } = props

  const height = size * 0.2
  const width = size * 0.56

  const arrowHeight = height * 0.5

  const { opacity } = useSpring({
    opacity: active ? 1 : 0,
    immediate: active,
    config: {
      tension: 210,
      friction: 20
    }
  })

  useTimeout(
    () => {
      hideCut({ x, y })
    },
    active ? fadeTime : null
  )

  return (
    <animated.div
      className={classes.wrapper}
      style={{
        opacity
      }}
    >
      <div className={classes.block}>
        {direction === 'Any' ? (
          <svg
            className={classes.indicator}
            width={size * 0.2}
            height={size * 0.2}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={arrowHeight} cy={arrowHeight} r={arrowHeight} />
          </svg>
        ) : (
          <svg
            className={classes.indicator}
            width={width}
            height={height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000"
              d={`M${width} ${arrowHeight} L${
                width * 0.5
              } 0 L 0 ${arrowHeight} L 0 ${height} H ${width} L ${width} ${arrowHeight} Z M 0 ${arrowHeight}`}
            />
          </svg>
        )}
      </div>
      <span className={classes.cut} />
    </animated.div>
  )
}
