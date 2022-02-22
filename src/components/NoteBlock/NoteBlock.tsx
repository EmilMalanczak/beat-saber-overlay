import type { FC, CSSProperties } from 'react'
import { useSpring, animated } from '@react-spring/web'

import { useTimeout } from '../../hooks/useTimeout'
import { NoteCut, useScoreStore } from '../../store/score'

import classes from './NoteBlock.module.scss'
import { getPositionStyles } from '../../utils/getNoteIndicatorPosition'
import { getRotationAngle } from '../../utils/getRotationAngle'

type Color = (color: string) => string

export type NoteBlockConfig = {
  indicator: {
    color: Color
    shadow: Color
    height: number
    width: number
    topHeight: number
    margin: number
  }
  dot: {
    size: number
    position: number
  }
  cut: {
    color: Color
    shadow: Color
    size: number
  }
  note: {
    color: Color
    size: number
  }
}

export type NoteBlockProps = {
  cut: NoteCut
  fadeTime: number
  noteConfig: NoteBlockConfig
}

export const NoteBlock: FC<NoteBlockProps> = (props) => {
  const { hideCut } = useScoreStore()
  const {
    noteConfig,
    fadeTime = 300,
    cut: { active, direction, x, y, color = '#FFF', fromCenter = 0, deviation = 0 }
  } = props

  const { indicator, dot, cut, note } = noteConfig

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
      style={
        {
          opacity,
          transform: `rotate(${-getRotationAngle(direction)}deg)`,
          '--note-size': note.size,
          '--note-color': note.color(color),
          '--note-indicator-color': indicator.color(color),
          '--note-indicator-shadow': indicator.shadow(color),
          '--note-indicator-margin': direction !== 'Any' ? indicator.margin : 0,
          '--note-cut-size': cut.size,
          '--note-cut-color': cut.color(color),
          '--note-cut-shadow': cut.shadow(color)
        } as unknown as CSSProperties
      }
    >
      <div className={classes.block}>
        {direction === 'Any' ? (
          <svg
            className={classes.indicator}
            width={dot.size}
            height={dot.size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={getPositionStyles(direction)}
          >
            <circle cx={dot.position} cy={dot.position} r={dot.position} />
          </svg>
        ) : (
          <svg
            className={classes.indicator}
            width={indicator.width}
            height={indicator.height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={getPositionStyles(direction)}
          >
            <path
              fill="#000"
              d={`M${indicator.width} ${indicator.topHeight} L${indicator.width * 0.5} 0 L 0 ${
                indicator.topHeight
              } L 0 ${indicator.height} H ${indicator.width} L ${indicator.width} ${
                indicator.topHeight
              } Z M 0 ${indicator.topHeight}`}
            />
          </svg>
        )}
      </div>
      <span
        className={classes.cut}
        style={{
          left: `${50 - fromCenter * 50}%`,
          transform: `translateX(-50%) rotate(${-deviation}deg)`
        }}
      />
    </animated.div>
  )
}
