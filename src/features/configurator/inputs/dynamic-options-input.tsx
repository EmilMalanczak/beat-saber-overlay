import { Button, InputWrapper } from '@mantine/core'
import { RiAddLine } from 'react-icons/ri'

import { DynamicPropOptions } from 'features/configurator/options/types/options'
import { useSyncedConfiguratorStore } from 'features/configurator/store/configurator'

import { optionsInputsBase } from './options-inputs'

export const DynamicOptionsInput = ({
  schema,
  label,
  description,
  value
}: DynamicPropOptions & { onChange: any }) => {
  const { saveConfig, editActiveElement } = useSyncedConfiguratorStore((state) => ({
    saveConfig: state.saveConfig,
    editActiveElement: state.editActiveElement
  }))

  return (
    <InputWrapper label={label} description={description}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        {value.map((val) => (
          <div
            style={{
              backgroundColor: 'red'
            }}
          >
            {schema.map(({ id: optId, inputTypeName: optInputType, propName, ...optProps }) => {
              const { component: NestedInput, handler: nestedHandler } =
                optionsInputsBase[optInputType]

              return (
                <NestedInput
                  {...optProps}
                  value={val[propName]}
                  onChange={(...args: any[]) => {
                    editActiveElement(optId, nestedHandler(...args))
                    saveConfig()
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
      <Button variant="light" rightIcon={<RiAddLine />}>
        Add other
      </Button>
    </InputWrapper>
  )
}
