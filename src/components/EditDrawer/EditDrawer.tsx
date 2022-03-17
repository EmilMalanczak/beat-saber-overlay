import type { VFC } from 'react'
import { Group, Drawer, Text, Button, Switch, Title } from '@mantine/core'

import { useStyles } from './EditDrawer.styles'
import { useConfiguratorStore } from '../../store/configurator'
import { optionsInputs } from './optionsInputs'
import { Option, TogglePropOptions } from '../../types/Options'

type EditDrawerProps = {
  opened: boolean
  setOpened: (value: boolean) => void
}

export const EditDrawer: VFC<EditDrawerProps> = ({ opened, setOpened }) => {
  const { classes } = useStyles()
  const { activeElement, saveConfig, editActiveElement, toggleActiveElementComponents } =
    useConfiguratorStore()

  // console.log(activeElement)

  return (
    <Drawer
      opened={opened}
      classNames={{
        drawer: classes.drawer
      }}
      onClose={() => setOpened(false)}
      title={<Title order={4}>Edit element</Title>}
      padding="xl"
      overlayOpacity={0}
      size="xl"
    >
      {activeElement?.description && (
        <Text size="sm" mb={16}>
          {activeElement?.description}
        </Text>
      )}
      <Group direction="column" spacing={12} className={classes.content}>
        {activeElement?.options.map(({ inputTypeName, id, ...props }) => {
          const { component: Input, handler } = optionsInputs[inputTypeName]

          if (inputTypeName === Option.TOGGLE_COMPONENTS) {
            const { options, checked, ...switchProps } = props as TogglePropOptions

            return (
              <>
                <Switch
                  checked={checked}
                  onChange={(e) => {
                    toggleActiveElementComponents(id, e.target.checked)
                    saveConfig()
                  }}
                  {...switchProps}
                />
                {options.map(
                  ({ id: optId, visibleWhenChecked, inputTypeName: optInputType, ...optProps }) => {
                    if (visibleWhenChecked !== checked) return null

                    const { component: NestedInput, handler: nestedHandler } =
                      optionsInputs[optInputType]

                    return (
                      <NestedInput
                        {...optProps}
                        onChange={(...args: any[]) => {
                          editActiveElement(optId, nestedHandler(...args))
                          saveConfig()
                        }}
                      />
                    )
                  }
                )}
              </>
            )
          }

          return (
            <Input
              {...props}
              onChange={(...args: any[]) => {
                editActiveElement(id, handler(...args))
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
