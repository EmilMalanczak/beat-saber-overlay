import { Group, Drawer, Text, Button, Title, ScrollArea } from '@mantine/core'

import type { VFC } from 'react'

import { DRAWER_WIDTH } from 'constants/dom'
import { DynamicOptionsInput } from 'features/configurator/inputs/dynamic-options-input'
import { getOptionInput } from 'features/configurator/inputs/options-inputs'
import { ToggleOptions } from 'features/configurator/inputs/toggle-options'
import {
  DynamicPropOptions,
  Option,
  TogglePropOptions
} from 'features/configurator/options/types/options'
import { useConfiguratorStore } from 'features/configurator/store/configurator'

import { useStyles } from './edit-element-drawer.styles'

type EditDrawerProps = {
  opened: boolean
  setOpened: (value: boolean) => void
}

export const EditDrawer: VFC<EditDrawerProps> = ({ opened, setOpened }) => {
  const { classes } = useStyles()
  const { activeElement, saveConfig, editActiveElement } = useConfiguratorStore()

  return (
    <Drawer
      opened={opened}
      classNames={{
        drawer: classes.drawer
      }}
      onClose={() => setOpened(false)}
      title={<Title order={4}>Edit element</Title>}
      padding={16}
      overlayOpacity={0}
      size={DRAWER_WIDTH}
    >
      {activeElement?.description && (
        <Text size="sm" mb={16}>
          {activeElement?.description}
        </Text>
      )}
      <ScrollArea
        type="always"
        offsetScrollbars
        style={{
          flex: 1
        }}
      >
        <Group direction="column" spacing={12} className={classes.content}>
          {activeElement?.options.map(({ inputTypeName, id, ...props }) => {
            const { component: Input, handler } = getOptionInput(inputTypeName)
            const onChange = (...args: any[]) => {
              editActiveElement(id, handler(...args))
              saveConfig()
            }

            if (inputTypeName === Option.TOGGLE_COMPONENTS) {
              return <ToggleOptions {...(props as TogglePropOptions)} onChange={onChange} id={id} />
            }

            if (inputTypeName === Option.DYNAMIC_OPTIONS) {
              return (
                <DynamicOptionsInput
                  {...(props as DynamicPropOptions)}
                  onChange={onChange}
                  id={id}
                />
              )
            }

            return <Input {...props} onChange={onChange} />
          })}
        </Group>
      </ScrollArea>

      <Group direction="row" spacing={16} pt={4} className={classes.buttons}>
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
