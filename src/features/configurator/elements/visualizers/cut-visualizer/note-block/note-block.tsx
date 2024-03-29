import { useSpring, animated } from '@react-spring/web'

import type { FC, CSSProperties } from 'react'

import { getNoteIndicatorPosition } from 'features/configurator/helpers/get-note-indicator-position'
import { getRotationAngle } from 'features/configurator/helpers/get-rotation-angle'
import { NoteCut, useCutsStore } from 'features/socket/store/cuts'
import { useTimeout } from 'hooks/use-timeout'

import classes from './note-block.module.scss'

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
    backgroundColor: Color
    size: number
  }
}

export type NoteBlockProps = {
  cut: NoteCut
  fadeTime: number
  noteConfig: NoteBlockConfig
}

export const NoteBlock: FC<NoteBlockProps> = (props) => {
  const hideCut = useCutsStore((state) => state.hideCut)
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
          '--note-background-color': note.backgroundColor(color),
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
            style={getNoteIndicatorPosition(direction)}
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
            style={getNoteIndicatorPosition(direction)}
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
