import { Popper, UnstyledButton, ActionIcon, Group } from '@mantine/core'
import { CSSProperties, useRef, useState } from 'react'

import { useDebouncedCallback } from 'use-debounce'
import ReactDraggable from 'react-draggable'
import { RiDeleteBin7Fill, RiEditFill, RiLockFill, RiLockUnlockFill } from 'react-icons/ri'

import type { DraggableProps as ReactDraggableProps, DraggableEventHandler } from 'react-draggable'
import type { FC, MouseEvent } from 'react'

import { useBooleanToggle, useClickOutside, useMergedRef } from '@mantine/hooks'
import { useStyles } from './Draggable.styles'

type Bounds = {
  top: number
  bottom: number
  right: number
  left: number
}

const defaultBounds = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}

type DraggableProps = Partial<Omit<ReactDraggableProps, 'defaultClassName'>> & {
  onRemove: () => void
  onEdit: () => void
  propsDependencies: any[]
  id: string
  zoom: number
}

export const Draggable: FC<DraggableProps> = ({
  bounds = 'parent',
  onStop,
  onRemove,
  onEdit,
  defaultPosition,
  children,
  propsDependencies,
  id,
  zoom,
  ...rest
}) => {
  const [opened, toggleOpened] = useBooleanToggle(false)
  const [isLocked, toggleLocked] = useBooleanToggle(false)
  const [isDragging, setDragging] = useState(false)

  const [position, setPosition] = useState(defaultPosition)

  const canvasBounds = useRef<Bounds>(defaultBounds)
  const [boxBounds, setBounds] = useState<Bounds>(defaultBounds)

  const boxRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const outsideClickRef = useClickOutside(() => toggleOpened(false))

  const { classes, cx } = useStyles({ zoom })

  const isOnOptionsNode = (e: MouseEvent<HTMLButtonElement>) =>
    optionsRef.current === e.target || optionsRef.current?.contains(e.target as Node) || false

  const saveConfiguratorCanvasPosition = () => {
    const canvasNode = document.getElementById('configurator-canvas')

    canvasBounds.current = canvasNode?.getBoundingClientRect() || defaultBounds
  }

  const debouncedSetBounds = useDebouncedCallback(() => {
    const { top, left, bottom, right } = boxRef.current?.getBoundingClientRect() || defaultBounds

    setBounds({
      top: Math.floor(Math.abs(top - canvasBounds.current.top) / zoom),
      right: Math.floor(Math.abs(right - canvasBounds.current.right) / zoom),
      bottom: Math.floor(Math.abs(bottom - canvasBounds.current.bottom) / zoom),
      left: Math.floor(Math.abs(left - canvasBounds.current.left) / zoom)
    })
  }, 8)

  const handleDrag: DraggableEventHandler = (e) => {
    e.stopPropagation()

    if (!isOnOptionsNode(e as MouseEvent<HTMLButtonElement>)) {
      debouncedSetBounds()

      if (opened) {
        toggleOpened(false)
      }
    }
  }

  return (
    <ReactDraggable
      bounds={bounds}
      position={position}
      defaultClassName={cx(classes.wrapper, 'draggable', {
        [classes.disabled]: isLocked,
        [classes.active]: opened,
        [classes.dragging]: isDragging
      })}
      defaultClassNameDragging={classes.wrapperGrabbing}
      disabled={isLocked}
      cancel=".options"
      onStart={() => {
        saveConfiguratorCanvasPosition()

        setDragging(true)
      }}
      onStop={(e, state) => {
        if (onStop) onStop(e, state)

        if (!isOnOptionsNode(e as MouseEvent<HTMLButtonElement>)) {
          setPosition({ x: state.x, y: state.y })
        }

        setDragging(false)
      }}
      onDrag={handleDrag}
      {...rest}
    >
      <UnstyledButton
        ref={useMergedRef(boxRef, outsideClickRef)}
        onClick={(e) => {
          if (!isOnOptionsNode(e)) {
            toggleOpened()
          }
        }}
        className={cx(classes.box, {
          [classes.dragging]: isDragging
        })}
        id={id}
        style={
          {
            '--offset-left': `${boxBounds.left}px`,
            '--offset-right': `${boxBounds.right}px`,
            '--offset-top': `${boxBounds.top}px`,
            '--offset-bottom': `${boxBounds.bottom}px`
          } as CSSProperties
        }
      >
        {isDragging && (
          <>
            <div className={cx(classes.offset, classes.offsetHorizontal, classes.offsetLeft)}>
              {boxBounds.left > 0 && <span>{boxBounds.left}</span>}
            </div>

            <div className={cx(classes.offset, classes.offsetHorizontal, classes.offsetRight)}>
              {boxBounds.right > 0 && <span>{boxBounds.right}</span>}
            </div>

            <div className={cx(classes.offset, classes.offsetVertical, classes.offsetTop)}>
              {boxBounds.top > 0 && <span>{boxBounds.top}</span>}
            </div>

            <div className={cx(classes.offset, classes.offsetVertical, classes.offsetBottom)}>
              {boxBounds.bottom > 0 && <span>{boxBounds.bottom}</span>}
            </div>
          </>
        )}
        {children}
        <Popper<HTMLDivElement>
          mounted={opened}
          referenceElement={boxRef.current as HTMLDivElement}
          position="top"
          placement="end"
          withArrow={false}
          gutter={6}
          forceUpdateDependencies={[position, ...propsDependencies]}
          transition="slide-down"
          zIndex={100}
          withinPortal={false}
          modifiers={[
            {
              // @ts-ignore
              name: 'zoomTransform',
              enabled: true,
              phase: 'beforeWrite',
              requires: ['computeStyles'],
              fn: ({ state }: any) => {
                state.styles.popper.transform = `translate3d(2px, -${
                  (state?.rects?.reference.height || 0) + Math.round(6 * zoom)
                }px, 0px)`
              }
            }
          ]}
        >
          <Group spacing={8} className={cx(classes.options, 'options')} ref={optionsRef}>
            <ActionIcon onClick={() => toggleLocked()}>
              {isLocked ? <RiLockFill /> : <RiLockUnlockFill />}
            </ActionIcon>
            <ActionIcon onClick={onEdit}>
              <RiEditFill />
            </ActionIcon>

            <ActionIcon onClick={onRemove}>
              <RiDeleteBin7Fill />
            </ActionIcon>
          </Group>
        </Popper>
      </UnstyledButton>
    </ReactDraggable>
  )
}
