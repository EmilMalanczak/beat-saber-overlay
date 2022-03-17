import type { VFC } from 'react'
import { options } from '../../options'
import { useConfiguratorStore } from '../../store/configurator'
import { Draggable } from '../Draggable/Draggable'
import { Option } from '../../types/Options'
import { useStyles } from './ConfiguratorCanvas.styles'

type ConfiguratorProps = {
  onEdit: (value: boolean) => void
}

export const ConfiguratorCanvas: VFC<ConfiguratorProps> = ({ onEdit }) => {
  const { classes } = useStyles()

  const { dragElement, elements, removeElement, selectElement } = useConfiguratorStore()

  return (
    <div className={classes.canvas}>
      {Object.values(elements).map(({ id, name, slug, options: elementOptions }) => {
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

        // console.log(elementProps)

        return (
          <Draggable
            id={id}
            onStop={(_, { x, y }) => {
              dragElement({
                slug,
                x,
                y
              })
            }}
            bounds="parent"
            defaultPosition={elements[slug].cords}
            propsDependencies={[elementOptions.map(({ value }) => value)]}
            onRemove={() => removeElement(slug)}
            onEdit={() => {
              onEdit(true)
              selectElement(slug)
            }}
          >
            <Item {...elementProps} />
          </Draggable>
        )
      })}
    </div>
  )
}
