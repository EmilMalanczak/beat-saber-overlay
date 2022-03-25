import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  options: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: 8,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    transform: 'scale(var(--options-scale))',
    margin: 'var(--options-offset) 0px',
    flexWrap: 'nowrap'
  }
}))
