import type { FC, CSSProperties } from 'react'

import { useScoreStore } from '../../store/score'
import { HitScore, HitScoreSharedProps } from './HitScore/HitScore'

import classes from './HitScoreVisualizer.module.scss'

export type HitScoreVisualizerProps = HitScoreSharedProps & {
  rows: 1 | 3
  width: number | string
  rowHeight: number
  style: any
}

export const HitScoreVisualizer: FC<HitScoreVisualizerProps> = (props) => {
  const { rows, style, width, rowHeight, ...scoreProps } = props
  const noteScores = useScoreStore((state) => state.noteScores)

  return (
    <div
      className={classes.grid}
      style={
        {
          ...style,
          '--grid-rows-amount': rows,
          '--grid-width': width,
          '--grid-height': rows * rowHeight
        } as CSSProperties
      }
    >
      {noteScores.map((rowNotes) =>
        rowNotes.map((cell) =>
          cell.scores.map((note) => (
            <HitScore key={note.id} maxRow={rows} note={note} {...scoreProps} />
          ))
        )
      )}
    </div>
  )
}
