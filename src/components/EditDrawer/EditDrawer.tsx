import type { VFC } from 'react'
import { Group, Drawer, Text, Button } from '@mantine/core'

import { useStyles } from './EditDrawer.styles'
import { useConfiguratorStore } from '../../store/configurator'
import { optionsInputs } from './optionsInputs'

type EditDrawer = {
  opened: boolean
  setOpened: (value: boolean) => void
}

export const EditDrawer: VFC<EditDrawer> = ({ opened, setOpened }) => {
  const { classes } = useStyles()
  const { activeElement, saveConfig, editActiveElement } = useConfiguratorStore()

  // console.log(activeElement)

  return (
    <Drawer
      opened={opened}
      classNames={{
        drawer: classes.drawer
      }}
      onClose={() => setOpened(false)}
      title="Edit element"
      padding="xl"
      overlayOpacity={0}
      size="xl"
    >
      {activeElement?.description && <Text mb={16}>{activeElement?.description}</Text>}
      <Group direction="column" spacing={12} className={classes.content}>
        {activeElement?.options.map(({ inputTypeName, propName, ...props }) => {
          const { component: Input, handler } = optionsInputs[inputTypeName]
          // console.log(props)

          return (
            <Input
              {...props}
              onChange={(...args: any[]) => {
                editActiveElement(propName, handler(...args))
                saveConfig()
              }}
            />
          )
        })}
      </Group>

      <Group direction="row" spacing={16} className={classes.buttons}>
        <Button
          color="red"
          onClick={() => {
            setOpened(false)
          }}
        >
          cancel
        </Button>
        <Button
          onClick={() => {
            saveConfig()
            setOpened(false)
          }}
        >
          save
        </Button>
      </Group>
    </Drawer>
  )
}
