import { useEffect, useRef, useState } from 'react'
import type { VFC } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { ActionIcon, Group, Portal } from '@mantine/core'
import { RiZoomInLine, RiZoomOutLine, RiFullscreenLine, RiFullscreenExitLine } from 'react-icons/ri'
import { useFullscreen } from '@mantine/hooks'
import { Resizable } from 'react-resizable'
import type { ResizableProps } from 'react-resizable'

import { useConfiguratorStore } from '../../store/configurator'
import { useStyles } from './ConfiguratorCanvas.styles'
import { roundZoomScale } from '../../helpers/roundZoomScale'
import { ConfiguratorItems } from './components/ConfiguratorItems'
import { CANVAS_ID } from '../../constants/dom'

const maxScale = 3
const minScale = 0.5

// calculations are inconsistent thats why .22 <shrug>
const scale = {
  step: 0.2,
  multiplier: 1.22
}

type ConfiguratorProps = {
  onEdit: (value: boolean) => void
}

export const ConfiguratorCanvas: VFC<ConfiguratorProps> = ({ onEdit }) => {
  const { canvas, setCanvas } = useConfiguratorStore((state) => ({
    canvas: state.canvas,
    setCanvas: state.setCanvas
  }))
  const { toggle: toggleFullscreen, fullscreen } = useFullscreen()
  const [isResizing, setResizing] = useState(false)
  const [wasInitiallyZoomed, setWasInitiallyZoomed] = useState(false)
  const panRef = useRef<ReactZoomPanPinchRef>(null)

  const { classes } = useStyles(canvas)

  const handleResizeCanvas: ResizableProps['onResize'] = (_, { size }) => {
    setCanvas({ width: size.width, height: size.height })
  }

  const getInitialZoom = () => {
    const vmin = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight

    const heightDimension = roundZoomScale(window.innerHeight / (canvas.height + vmin * 0.1))
    const widthDimension = roundZoomScale(window.innerWidth / (canvas.width + vmin * 0.1))

    return heightDimension > widthDimension ? widthDimension : heightDimension
  }

  useEffect(() => {
    if (!wasInitiallyZoomed && panRef.current) {
      const initialZoom = getInitialZoom()

      setCanvas({ zoom: initialZoom })
      panRef.current.centerView(initialZoom)
      setWasInitiallyZoomed(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panRef.current])

  return (
    <TransformWrapper
      ref={panRef}
      minScale={minScale}
      maxScale={maxScale}
      centerOnInit
      disabled={isResizing}
      doubleClick={{ disabled: true }}
      onInit={({ state }) => setCanvas({ zoom: state.scale })}
      onZoomStop={({ state }) => {
        let finalScale = state.scale

        if (state.scale < minScale) {
          finalScale = minScale
        }

        if (state.scale > maxScale) {
          finalScale = maxScale
        }

        setCanvas({ zoom: finalScale })
      }}
    >
      {({ zoomIn, zoomOut, state, centerView }) => (
        <>
          <TransformComponent wrapperClass={classes.background}>
            <Resizable
              width={canvas.width}
              height={canvas.height}
              onResize={handleResizeCanvas}
              onResizeStart={() => setResizing(true)}
              onResizeStop={() => {
                setResizing(false)
                centerView()
              }}
            >
              <div className={classes.wrapper}>
                <span className={classes.size}>
                  {`${canvas.width} x ${canvas.height}, zoom: ${canvas.zoom}x`}
                </span>
                <div className={classes.canvas} id={CANVAS_ID}>
                  <ConfiguratorItems onEdit={onEdit} />
                </div>
              </div>
            </Resizable>
          </TransformComponent>

          <Portal zIndex={5}>
            <Group spacing={4} className={classes.canvasControls}>
              <ActionIcon
                size="lg"
                radius="lg"
                variant="filled"
                onClick={() => {
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
