import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  wrapper: {
    border: '1px solid green'
  },
  box: {
    width: 'max-content',
    height: 'auto',
    position: 'relative',

    '& > div:last-of-type > *': {
      pointerEvents: 'none',

      '& > *': {
        pointerEvents: 'auto !important' as any
      }
    }
  },
  options: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    cursor: 'pointer'
  }
}))
