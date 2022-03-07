import type { VFC } from 'react'
import { Group, Drawer, Text } from '@mantine/core'

import { useStyles } from './EditDrawer.styles'

type EditDrawer = {
  opened: boolean
  setOpened: (value: boolean) => void
}

export const EditDrawer: VFC<EditDrawer> = ({ opened, setOpened, options, name, description }) => {
  const { classes } = useStyles()

  console.log('drawer is opened:', opened)

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Edit element"
      padding="xl"
      size="xl"
    >
      {description && <Text>{description}</Text>}
      <Group direction="column" spacing={16}>
        <div>dsadsa</div>
      </Group>
    </Drawer>
  )
}
