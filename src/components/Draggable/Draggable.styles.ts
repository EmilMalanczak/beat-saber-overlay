import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  wrapper: {
    border: '1px solid green',
    position: 'absolute',
    zIndex: 1,
    cursor: 'drag'
  },
  wrapperGrabbing: {
    cursor: 'grabbing'
  },
  active: {
    zIndex: 2
  },
  disabled: {
    zIndex: 0
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
    padding: 8,
    borderRadius: theme.radius.md,
    cursor: 'pointer'
  }
}))
