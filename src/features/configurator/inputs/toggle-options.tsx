import { Switch } from '@mantine/core'

import { TogglePropOptions } from 'features/configurator/options/types/options'
import { useConfiguratorStore } from 'features/configurator/store/configurator'

import { getOptionInput } from './options-inputs'

export const ToggleOptions = ({
  options,
  checked,
  id,
  ...switchProps
}: TogglePropOptions & { id: string }) => {
  const { saveConfig, editActiveElement, toggleActiveElementComponents } = useConfiguratorStore()

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

          const { component: NestedInput, handler: nestedHandler } = getOptionInput(optInputType)

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
