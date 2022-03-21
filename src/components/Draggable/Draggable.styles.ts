import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme, { zoom }: { zoom: number }) => ({
  wrapper: {
    position: 'absolute',
    zIndex: 1,
    cursor: 'grab',
    outlineOffset: 4,
    transition: '0.2s outline-offset ease'
  },

  wrapperGrabbing: {
    cursor: 'grabbing',
    outlineOffset: 0
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
    },

    '&:hover': {
      outline: `1px solid ${theme.colors.dark[2]}`
    },

    '&:focus': {
      boxShadow: 'none',

      '&:not(:hover)': {
        outline: `1px solid ${theme.colors.dark[3]}`
      }
    }
  },

  dragging: {
    outline: `1px solid ${theme.colors.dark[2]}`
  },

  options: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: 8,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    transform: `scale(${1 / zoom})`,
    transformOrigin: 'bottom right'
  },

  offset: {
    position: 'absolute',

    '& span': {
      position: 'absolute',
      padding: 3,
      backgroundColor: theme.colors.dark[4],
      fontSize: 10,
      borderRadius: 4
    },

    '&::after': {
      position: 'absolute',
      background: theme.colors.dark[3],
      content: "''"
    }
  },

  offsetHorizontal: {
    bottom: '50%',

    '&::after': {
      height: 1,
      width: '100vw',
      top: 4
    }
  },

  offsetVertical: {
    left: '50%',

    '&::after': {
      width: 1,
      height: '100vh',
      right: 4
    }
  },

  offsetTop: {
    height: 'var(--offset-top)',
    bottom: '100%',

    '& span': {
      left: 0,
      bottom: 'calc(50% - 10px)'
    },

    '&::after': {
      bottom: 'calc(100% - var(--offset-top))'
    }
  },

  offsetBottom: {
    height: 'var(--offset-bottom)',
    top: '100%',

    '& span': {
      left: 0,
      bottom: 'calc(50% - 10px)'
    },

    '&::after': {
      top: 'calc(100% - var(--offset-bottom))'
    }
  },

  offsetLeft: {
    width: 'var(--offset-left)',
    right: '100%',

    '& span': {
      bottom: 0,
      left: 'calc(50% - 10px)'
    },

    '&::after': {
      right: 'calc(100% - var(--offset-left))'
    }
  },

  offsetRight: {
    width: 'var(--offset-right)',
    left: '100%',

    '& span': {
      bottom: 0,
      right: 'calc(50% - 10px)'
    },

    '&::after': {
      left: 'calc(100% - var(--offset-right))'
    }
  }
}))
