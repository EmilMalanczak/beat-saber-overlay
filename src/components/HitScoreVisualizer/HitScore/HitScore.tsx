import { useMemo } from 'react'
import type { FC } from 'react'
import { useSpring, animated } from '@react-spring/web'

import { useScoreStore } from '../../../store/score'
import { getScoreAngle } from '../../../helpers/getScoreAngle'
import { getScoreTransformDistance } from '../../../helpers/getScoreTransformDistance'
import { useTimeout } from '../../../hooks/useTimeout'
import { getScoreQualityStyles } from '../../../helpers/getScoreQualityStyles'

import type { NoteCut } from '../../../store/score'

import classes from './HitScore.module.scss'

export type HitScoreConfig = Array<{
  above: number
  color: string
  fontSize: number
  [key: string]: any
}>

export type HitScoreSharedProps = {
  unmountTime: number
  config: HitScoreConfig
  scoreCutShift: number
  maxRotate: number
}

export type HitScoreProps = HitScoreSharedProps & {
  maxRow: number
  note: Omit<NoteCut, 'active'>
}

export const HitScore: FC<HitScoreProps> = ({
  note,
  unmountTime,
  maxRow,
  maxRotate,
  scoreCutShift,
  config
}) => {
  const { radians = 0, x, y, score, id } = note
  const unmountScoreNote = useScoreStore((state) => state.unmountScoreNote)

  const { transform, rotate, ...qualityStyles } = useMemo(() => {
    const { x0, x1, y0, y1 } = getScoreTransformDistance(radians, scoreCutShift)
    const scoreAngle = getScoreAngle(radians, maxRotate)

    return {
      transform: {
        x0,
        x1,
        y0,
        y1
      },
      rotate: scoreAngle,
      ...getScoreQualityStyles(score!, config)
    }
  }, [radians, scoreCutShift, maxRotate, score, config])

  const [styles, set] = useSpring(() => ({
    from: {
      x: transform.x0,
      y: transform.y0,
      rotate: 0,
      opacity: 0
    },
    to: {
      x: transform.x1,
      y: transform.y1,
      rotate,
      opacity: 1
    },
    config: {
      tension: 260,
      friction: 20,
      velocity: 0.01,
      mass: 2
    }
  }))

  useTimeout(() => {
    set({
      opacity: 0
    })

    if (id) {
      unmountScoreNote({ id, x, y })
    }
  }, unmountTime)

  const row = maxRow - y > 1 ? maxRow - y : 1

  return (
    <animated.div
      className={classes.score}
      style={
        {
          ...styles,
          //  css grid columns are counted from 1
          '--hit-score-column': x + 1,
          // grid row is 1 on top
          '--hit-score-row': row,
          ...qualityStyles
        } as any
      }
    >
      {note.score}
    </animated.div>
  )
}
