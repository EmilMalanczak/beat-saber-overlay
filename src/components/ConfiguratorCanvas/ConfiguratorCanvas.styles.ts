import { createStyles } from '@mantine/styles'

export const useStyles = createStyles((theme) => ({
  canvas: {
    margin: 20,
    marginLeft: 'auto',
    outline: `2px solid ${theme.colors.dark[4]}`,
    height: 600,
    width: 1000,
    position: 'relative',
    overflow: 'auto',
    padding: 20,
    backgroundColor: theme.colors.dark[8]
  }
}))
