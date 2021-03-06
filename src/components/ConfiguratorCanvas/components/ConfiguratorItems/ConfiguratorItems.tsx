import { memo } from 'react'

import type { FC } from 'react'

import { Draggable } from 'components/ConfiguratorCanvas/components/Draggable'
import { options } from 'options/index'
import { useConfiguratorStore, useConfiguratorStoreBare } from 'store/configurator'
import { Option } from 'types/Options'

type ConfiguratorItemProps = {
  onEdit: (value: boolean, params: { initialLeft: number; finalLeft: number; y: number }) => void
}

export const ConfiguratorItems: FC<ConfiguratorItemProps> = memo(({ onEdit }) => {
  const zoom = useConfiguratorStoreBare((state) => state.canvas.zoom)

  // TODO: selector for this
  const { dragElement, elements, removeElement, selectElement, activeScreen } =
    useConfiguratorStore()

  return (
    <>
      {elements[activeScreen].map(({ name, options: elementOptions, cords }, index) => {
        const Item = options.find((opt) => opt.name === name)?.component

        if (!Item) return null

        const elementProps = elementOptions.reduce((acc, item) => {
          if (item?.inputTypeName === Option.TOGGLE_COMPONENTS) {
            return {
              ...acc,
              ...item.options.reduce(
                (nAcc, nItem) => ({
                  ...nAcc,
                  [nItem.propName]: nItem.value
                }),
                {}
              )
            }
          }

          return {
            ...acc,
            [item.propName]: item.value
          }
        }, {})

        return (
          <Draggable
            id={name}
            onStop={({ x, y }) => {
              dragElement({
                index,
                x,
                y
              })
            }}
            bounds="parent"
            zoom={zoom as unknown as number}
            defaultPosition={cords}
            propsDependencies={[elementOptions.map(({ value }) => value)]}
            onRemove={() => removeElement(index)}
            onEdit={(params) => {
              onEdit(true, params)
              selectElement(index)
            }}
          >
            <Item {...elementProps} />
          </Draggable>
        )
      })}
    </>
  )
})
