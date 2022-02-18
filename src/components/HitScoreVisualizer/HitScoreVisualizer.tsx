import type { FC } from 'react'

import { useScoreStore } from '../../store/score'
import { HitScore, HitScoreSharedProps } from '../HitScore/HitScore'
import { useStyles } from './HitScoreVisualizer.styles'

export type HitScoreVisualizerProps = HitScoreSharedProps & {
  rows: 1 | 3
  width: number | string
  rowHeight: number
  style: any
}

export const HitScoreVisualizer: FC<HitScoreVisualizerProps> = (props) => {
  const { rows, style, ...scoreProps } = props

  const { classes } = useStyles(props)
  const { noteScores } = useScoreStore()

  return (
    <div className={classes.grid} style={style}>
      {noteScores.map((note) => (
        <HitScore key={note.id} maxRow={rows} note={note} {...scoreProps} />
      ))}
    </div>
  )
}
