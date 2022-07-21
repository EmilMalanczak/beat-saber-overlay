import { Button, InputWrapper } from '@mantine/core'
import { RiAddLine } from 'react-icons/ri'

import { useConfiguratorStore } from 'store/configurator'
import { DynamicPropOptions } from 'types/Options'

import { optionsInputsBase } from './optionsInputs'

export const DynamicOptionsInput = ({
  schema,
  label,
  description,
  value
}: DynamicPropOptions & { onChange: any }) => {
  const { saveConfig, editActiveElement } = useConfiguratorStore()

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
