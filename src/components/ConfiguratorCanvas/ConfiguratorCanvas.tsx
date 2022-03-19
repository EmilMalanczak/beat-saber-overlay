import type { VFC } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { ActionIcon, Group, Portal } from '@mantine/core'
import { RiZoomInLine, RiZoomOutLine, RiFullscreenLine, RiFullscreenExitLine } from 'react-icons/ri'
import { useFullscreen } from '@mantine/hooks'

import { options } from '../../options'
import { useConfiguratorStore } from '../../store/configurator'
import { Draggable } from '../Draggable/Draggable'
import { Option } from '../../types/Options'
import { useStyles } from './ConfiguratorCanvas.styles'

const dragDisabledElements = ['draggable']

type ConfiguratorProps = {
  onEdit: (value: boolean) => void
}

export const ConfiguratorCanvas: VFC<ConfiguratorProps> = ({ onEdit }) => {
  const { classes } = useStyles()

  const { dragElement, elements, removeElement, selectElement, canvas } = useConfiguratorStore()
  const { toggle: toggleFullscreen, fullscreen } = useFullscreen()

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.75}
      maxScale={4}
      wheel={{ excluded: dragDisabledElements }}
      pinch={{ excluded: dragDisabledElements }}
      panning={{ excluded: dragDisabledElements }}
      doubleClick={{ excluded: dragDisabledElements, step: 0.5 }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <TransformComponent wrapperClass={classes.wrapper}>
            <div className={classes.canvas}>
              <span className={classes.size}>{`${canvas.width} x ${canvas.height}`}</span>
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

                // console.log(elementProps)

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
          </TransformComponent>

          <Portal zIndex={5}>
            <Group
              spacing={4}
              styles={{
                root: {
                  position: 'fixed',
                  bottom: 16,
                  right: 16
                }
              }}
            >
              <ActionIcon size="lg" radius="lg" variant="filled" onClick={() => zoomIn(0.3)}>
                <RiZoomInLine />
              </ActionIcon>

              <ActionIcon size="lg" radius="lg" variant="filled" onClick={() => zoomOut(0.3)}>
                <RiZoomOutLine />
              </ActionIcon>

              <ActionIcon size="lg" radius="lg" variant="filled" onClick={() => toggleFullscreen()}>
                {fullscreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
              </ActionIcon>
            </Group>
          </Portal>
        </>
      )}
    </TransformWrapper>
  )
}
