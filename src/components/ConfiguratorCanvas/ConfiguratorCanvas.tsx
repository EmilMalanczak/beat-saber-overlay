import type { VFC } from 'react'
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { ActionIcon, Group, Portal } from '@mantine/core'
import { RiZoomInLine, RiZoomOutLine, RiFullscreenLine, RiFullscreenExitLine } from 'react-icons/ri'
import { useFullscreen } from '@mantine/hooks'

import { options } from '../../options'
import { useConfiguratorStore } from '../../store/configurator'
import { Draggable } from '../Draggable/Draggable'
import { Option } from '../../types/Options'
import { useStyles } from './ConfiguratorCanvas.styles'
import { roundZoomScale } from '../../helpers/roundZoomScale'

const maxScale = 3
const minScale = 0.75

// calculations are inconsistent thats why .22 <shrug>
const scale = {
  step: 0.2,
  multiplier: 1.22
}

type ConfiguratorProps = {
  onEdit: (value: boolean) => void
}

export const ConfiguratorCanvas: VFC<ConfiguratorProps> = ({ onEdit }) => {
  const { classes } = useStyles()

  const { dragElement, elements, removeElement, selectElement, canvas, setCanvas } =
    useConfiguratorStore()
  const { toggle: toggleFullscreen, fullscreen } = useFullscreen()

  return (
    <TransformWrapper
      initialScale={1}
      minScale={minScale}
      maxScale={maxScale}
      centerOnInit
      doubleClick={{ disabled: true }}
      onInit={({ state }) => setCanvas({ zoom: state.scale })}
      onZoom={({ state }) => setCanvas({ zoom: state.scale })}
    >
      {({ zoomIn, zoomOut, state }) => (
        <>
          <TransformComponent wrapperClass={classes.wrapper}>
            <div className={classes.canvas}>
              <span className={classes.size}>
                {`${canvas.width} x ${canvas.height}, zoom: ${canvas.zoom}x`}
              </span>
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
                    zoom={canvas.zoom}
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
            <Group spacing={4} className={classes.zoomControls}>
              <ActionIcon
                size="lg"
                radius="lg"
                variant="filled"
                onClick={() => {
                  console.log(state)

                  zoomIn(scale.step)

                  const multipliedScale = roundZoomScale(state.scale * scale.multiplier)

                  setCanvas({
                    zoom: maxScale > multipliedScale ? multipliedScale : maxScale
                  })
                }}
              >
                <RiZoomInLine />
              </ActionIcon>

              <ActionIcon
                size="lg"
                radius="lg"
                variant="filled"
                onClick={() => {
                  zoomOut(scale.step)

                  const multipliedScale = roundZoomScale(state.scale / scale.multiplier)

                  setCanvas({
                    zoom: minScale < multipliedScale ? multipliedScale : minScale
                  })
                }}
              >
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
