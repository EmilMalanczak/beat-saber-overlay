import { createStyles } from '@mantine/styles'

export const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    cursor: 'move'
  },

  canvas: {
    margin: '28px 20px',
    outline: `2px solid ${theme.colors.dark[4]}`,
    height: 600,
    width: 1000,
    position: 'relative',
    // cursor: 'move',
    // overflow: 'auto',
    padding: 20,
    backgroundColor: theme.colors.dark[8]
  },

  size: {
    position: 'absolute',
    bottom: 'calc(100% + 2px)',
    left: 0,
    color: theme.colors.dark[2],
    fontSize: 12,
    ...theme.fn.fontStyles()
  },

  zoomControls: {
    position: 'fixed',
    bottom: 16,
    right: 16
  }
}))
