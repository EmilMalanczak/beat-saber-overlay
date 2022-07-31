import { memo } from 'react'

import type { FC } from 'react'

import { Draggable } from 'features/configurator/canvas/draggable'
import { getConfiguratorItemComponent } from 'features/configurator/helpers/get-configurator-item-component'
import { getConfiguratorItemProps } from 'features/configurator/helpers/get-configurator-item-props'
import { useSyncedConfiguratorStore } from 'features/configurator/store/configurator'

type ConfiguratorItemProps = {
  onEdit: (value: boolean, params: { initialLeft: number; finalLeft: number; y: number }) => void
}

export const ConfiguratorItems: FC<ConfiguratorItemProps> = memo(({ onEdit }) => {
  // TODO: selector for this
  const { dragElement, elements, removeElement, selectElement, activeScreen, zoom } =
    useSyncedConfiguratorStore((state) => ({
      dragElement: state.dragElement,
      elements: state.elements,
      removeElement: state.removeElement,
      selectElement: state.selectElement,
      activeScreen: state.activeScreen,
      zoom: state.canvas.zoom
    }))

  return (
    <>
      {elements[activeScreen].map(({ name, options: elementOptions, cords }, index) => {
        const Item = getConfiguratorItemComponent(name)

        if (!Item) return null

        const elementProps = getConfiguratorItemProps(elementOptions)

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
