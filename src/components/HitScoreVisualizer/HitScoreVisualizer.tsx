import type { FC } from 'react'

import { useScoreStore } from '../../store/score'
import { HitScore, HitScoreSharedProps } from '../HitScore/HitScore'
import { useStyles } from './HitScoreVisualizer.styles'

export type HitScoreVisualizerProps = HitScoreSharedProps & {
  rows: 1 | 3
  width: number
  rowHeight: number
}

export const HitScoreVisualizer: FC<HitScoreVisualizerProps> = (props) => {
  const { rows, ...scoreProps } = props

  const { classes } = useStyles(props)
  const { noteScores } = useScoreStore()

  return (
    <div className={classes.grid}>
      {noteScores.map((note) => (
        <HitScore key={note.id} maxRow={rows} note={note} {...scoreProps} />
      ))}
    </div>
  )
}
