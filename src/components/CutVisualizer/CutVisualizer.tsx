import type { FC } from 'react'

import { useScoreStore } from '../../store/score'
import { NoteBlock } from '../NoteBlock'
import { useStyles } from './CutVisualizer.styles'

export type CutVisualizerProps = {
  cellSize?: number
  gap?: number
  fadeTime?: number
  gridColor?: string
  gridBorderSize?: number
  style: any
}

export const CutVisualizer: FC<CutVisualizerProps> = ({
  cellSize = 50,
  fadeTime = 300,
  gridColor = 'transparent',
  gridBorderSize = 2,
  style,
  ...rest
}) => {
  const { classes } = useStyles({ cellSize, fadeTime, gridColor, gridBorderSize, style, ...rest })
  const { noteCuts } = useScoreStore()

  return (
    <div className={classes.grid} style={style}>
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
