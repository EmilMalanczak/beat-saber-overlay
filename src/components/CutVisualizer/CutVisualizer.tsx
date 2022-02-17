import type { FC } from 'react'

import { useScoreStore } from '../../store/score'
import { NoteBlock } from '../NoteBlock'
import { useStyles } from './CutVisualizer.styles'

export type CutVisualizerProps = {
  cellSize?: number
  gap?: number
  fadeTime?: number
}

export const CutVisualizer: FC<CutVisualizerProps> = (props) => {
  const { cellSize, fadeTime } = props

  const { classes } = useStyles(props)
  const { noteCuts } = useScoreStore()

  return (
    <div className={classes.grid}>
      {noteCuts.map((rowNotes) =>
        rowNotes.map((cell) => (
          <div className={classes.blockWrapper}>
            <NoteBlock fadeTime={fadeTime} size={cellSize} cut={cell} />
          </div>
        ))
      )}
    </div>
  )
}
