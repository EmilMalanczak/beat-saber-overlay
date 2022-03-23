import { createStyles, keyframes } from '@mantine/core'

const reveal = keyframes`
  from {
    opacity: 0;
    background: red;
  }

  to {
    opacity: 1;
  }
`

export const useStyles = createStyles((theme, { zoom }: { zoom: number }) => ({
  offset: {
    position: 'absolute',

    '& span': {
      position: 'absolute',
      padding: 3 / zoom,
      animation: `${reveal} 1s ease forward`,

      backgroundColor: theme.colors.dark[4],
      fontSize: 12 / zoom,
      borderRadius: 4
    },

    '&::after': {
      position: 'absolute',
      background: theme.colors.dark[3],
      content: "''"
    }
  },

  horizontal: {
    bottom: '50%',

    '&::after': {
      height: 1,
      width: '100vw',
      top: 4
    }
  },

  vertical: {
    left: '50%',

    '&::after': {
      width: 1,
      height: '100vh',
      right: 4
    }
  },

  top: {
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

  bottom: {
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

  left: {
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

  right: {
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
