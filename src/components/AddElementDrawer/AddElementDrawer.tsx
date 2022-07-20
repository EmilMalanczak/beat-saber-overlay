import { Button, Drawer, Group } from '@mantine/core'
import { VFC } from 'react'

import { options } from 'options/index'
import { useConfiguratorStore } from 'store/configurator'

type AddElementDrawerProps = {
  opened: boolean
  setOpened: (value: boolean) => void
}

export const AddElementDrawer: VFC<AddElementDrawerProps> = ({ opened, setOpened }) => {
  const { addElement, activeScreen } = useConfiguratorStore()

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add element"
      padding="xl"
      size="xl"
    >
      <Group direction="column" spacing={16}>
        {options
          .filter((option) => option.screen.some((screen) => screen === activeScreen))
          .map((component) => (
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
