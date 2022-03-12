import { createStyles } from '@mantine/styles'

export const useStyles = createStyles((theme) => ({
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    borderRight: `1px solid ${theme.colors.gray[7]}`
  },
  content: {
    flexGrow: 1,
    overflow: 'scroll',
    flexWrap: 'nowrap',

    '& > *': {
      width: '100%'
    }
  },
  buttons: {
    alignSelf: 'flex-end'
  }
}))
