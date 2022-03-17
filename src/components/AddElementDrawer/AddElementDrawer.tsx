import { VFC } from 'react'
import { Button, Drawer, Group } from '@mantine/core'
import { options } from '../../options'
import { useConfiguratorStore } from '../../store/configurator'

type AddElementDrawerProps = {
  opened: boolean
  setOpened: (value: boolean) => void
}

export const AddElementDrawer: VFC<AddElementDrawerProps> = ({ opened, setOpened }) => {
  const { addElement } = useConfiguratorStore()

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add element"
      padding="xl"
      size="xl"
    >
      <Group direction="column" spacing={16}>
        {options.map((component) => (
          <Button
            onClick={() => {
              addElement(component)
              setOpened(false)
            }}
          >
            {`add ${component.name}`}
          </Button>
        ))}
      </Group>
    </Drawer>
  )
}
