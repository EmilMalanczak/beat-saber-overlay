import type { FC, CSSProperties } from 'react'

import { useCutsStore } from 'features/socket/store/cuts'

import { HitScore, HitScoreSharedProps } from './hit-score'
import classes from './hit-score-visualizer.module.scss'

export type HitScoreVisualizerProps = HitScoreSharedProps & {
  rows: 1 | 3
  width: number | string
  rowHeight: number
  style: any
}

export const HitScoreVisualizer: FC<HitScoreVisualizerProps> = (props) => {
  const { rows, style, width, rowHeight, ...scoreProps } = props
  const noteScores = useCutsStore((state) => state.noteScores)

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
