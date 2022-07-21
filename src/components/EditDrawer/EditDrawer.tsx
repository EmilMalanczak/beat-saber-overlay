import { Group, Drawer, Text, Button, Title, InputWrapper, ScrollArea } from '@mantine/core'
import { RiAddLine } from 'react-icons/ri'

import type { VFC } from 'react'

import { DynamicOptionsInput } from 'components/OptionInputs/DynamicOptionsInput'
import { ToggleOptions } from 'components/OptionInputs/ToggleOptions'
import { DRAWER_WIDTH } from 'constants/dom'
import { useConfiguratorStore } from 'store/configurator'
import { DynamicPropOptions, Option, TogglePropOptions } from 'types/Options'

import { useStyles } from './EditDrawer.styles'

import { getOptionInput } from '../OptionInputs/optionsInputs'

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
