import type { FC } from 'react'

import { useScoreStore } from '../../store/score'
import { NoteBlock } from '../NoteBlock'
import { useStyles } from './CutVisualizer.styles'

export type CutVisualizerProps = {
  cellSize?: number
  gap?: number
  fadeTime?: number
}

export const CutVisualizer: FC<CutVisualizerProps> = ({
  cellSize = 50,
  fadeTime = 300,
  ...rest
}) => {
  const { classes } = useStyles({ cellSize, fadeTime, ...rest })
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
