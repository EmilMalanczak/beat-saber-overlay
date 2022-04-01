import { memo } from 'react'

import type { FC } from 'react'

import { Draggable } from 'components/Draggable'
import { options } from 'options/index'
import { useConfiguratorStore, useConfiguratorStoreBare } from 'store/configurator'
import { Option } from 'types/Options'

type ConfiguratorItemProps = {
  onEdit: (value: boolean, params: { initialLeft: number; finalLeft: number; y: number }) => void
}

export const ConfiguratorItems: FC<ConfiguratorItemProps> = memo(({ onEdit }) => {
  const zoom = useConfiguratorStoreBare((state) => state.canvas.zoom)

  const { dragElement, elements, removeElement, selectElement } = useConfiguratorStore((state) => ({
    elements: state.elements,
    dragElement: state.dragElement,
    removeElement: state.removeElement,
    selectElement: state.selectElement
  }))

  return (
    <>
      {Object.values(elements).map(({ name, slug, options: elementOptions }) => {
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
            onStop={(_, { x, y }) => {
              dragElement({
                slug,
                x,
                y
              })
            }}
            bounds="parent"
            zoom={zoom as unknown as number}
            defaultPosition={elements[slug].cords}
            propsDependencies={[elementOptions.map(({ value }) => value)]}
            onRemove={() => removeElement(slug)}
            onEdit={(params) => {
              onEdit(true, params)
              selectElement(slug)
            }}
          >
            <Item {...elementProps} />
          </Draggable>
        )
      })}
    </>
  )
})
