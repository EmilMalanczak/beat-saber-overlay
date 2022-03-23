import { createStyles } from '@mantine/styles'

export const useStyles = createStyles(
  (theme, { width, height, zoom }: { width: number; height: number; zoom: number }) => ({
    background: {
      width: '100%',
      height: '100vh',
      cursor: 'move',

      '& .react-resizable-handle': {
        transformOrigin: 'bottom right',
        transform: `scale(${1 / zoom})`
      }
    },

    wrapper: {
      margin: '10vmin'
    },

    canvas: {
      outline: `2px solid ${theme.colors.dark[4]}`,
      height,
      width,
      position: 'relative',
      // cursor: 'move',
      overflow: 'hidden',
      padding: 20,
      backgroundColor: theme.colors.dark[8]
    },

    size: {
      position: 'absolute',
      bottom: 'calc(100% + 2px)',
      left: 0,
      color: theme.colors.dark[2],
      fontSize: 12 / zoom,
      ...theme.fn.fontStyles()
    },

    canvasControls: {
      position: 'fixed',
      bottom: 16,
      right: 16
    }
  })
)
