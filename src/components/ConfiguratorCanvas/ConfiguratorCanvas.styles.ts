import { createStyles } from '@mantine/styles'

export const useStyles = createStyles((theme) => ({
  canvas: {
    margin: '28px 20px',
    marginLeft: 'auto',
    outline: `2px solid ${theme.colors.dark[4]}`,
    height: 600,
    width: 1000,
    position: 'relative',
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
  }
}))
