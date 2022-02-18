import { useMemo } from 'react'
import type { FC } from 'react'
import { useSpring, animated } from '@react-spring/web'

import { useScoreStore } from '../../store/score'
import type { NoteCut } from '../../store/score'
import { getScoreAngle } from '../../utils/getScoreAngle'
import { getScoreTransformDistance } from '../../utils/getScoreTransformDistance'
import { useStyles } from './HitScore.styles'
import { useTimeout } from '../../hooks/useTimeout'

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
  config,
  maxRotate,
  scoreCutShift
}) => {
  const { radians = 0 } = note
  const { classes } = useStyles({ ...note, maxRow, config })
  const { unmountScoreNote } = useScoreStore()

  const transform = useMemo(() => {
    const { x0, x1, y0, y1 } = getScoreTransformDistance(radians, scoreCutShift)
    const scoreAngle = getScoreAngle(radians, maxRotate)

    return {
      x0,
      x1,
      y0,
      y1,
      rotate: scoreAngle
    }
  }, [radians, scoreCutShift, maxRotate])

  const [styles] = useSpring(() => ({
    from: {
      x: transform.x0,
      y: transform.y0,
      rotate: 0,
      opacity: 0
    },
    to: {
      x: transform.x1,
      y: transform.y1,
      rotate: transform.rotate,
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
    unmountScoreNote(note.id!)
  }, unmountTime)

  return (
    <animated.div className={classes.score} style={styles}>
      {note.score}
    </animated.div>
  )
}
