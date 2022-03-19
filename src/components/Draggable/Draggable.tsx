import { Popper, UnstyledButton, ActionIcon, Group } from '@mantine/core'
import { useRef, useState } from 'react'

import ReactDraggable from 'react-draggable'
import { RiDeleteBin7Fill, RiEditFill, RiLockFill, RiLockUnlockFill } from 'react-icons/ri'

import type { DraggableProps as ReactDraggableProps } from 'react-draggable'
import type { FC, MouseEvent } from 'react'

import { useBooleanToggle, useClickOutside, useMergedRef } from '@mantine/hooks'
import { useStyles } from './Draggable.styles'
import { useConfiguratorStore } from '../../store/configurator'

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
  const [position, setPosition] = useState(defaultPosition)

  const boxRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const outsideClickRef = useClickOutside(() => toggleOpened(false))

  const { classes, cx } = useStyles({ zoom })

  const isOnOptionsNode = (e: MouseEvent<HTMLButtonElement>) =>
    optionsRef.current === e.target || optionsRef.current?.contains(e.target as Node) || false

  return (
    <ReactDraggable
      onStop={onStop}
      bounds={bounds}
      position={position}
      defaultClassName={cx(classes.wrapper, 'draggable', {
        [classes.disabled]: isLocked,
        [classes.active]: opened
      })}
      defaultClassNameDragging={classes.wrapperGrabbing}
      disabled={isLocked}
      cancel=".options"
      onDrag={(e, { x, y }) => {
        e.stopPropagation()

        if (!isOnOptionsNode(e as MouseEvent<HTMLButtonElement>)) {
          setPosition({ x, y })

          if (opened) {
            toggleOpened(false)
          }
        }
      }}
      {...rest}
    >
      <UnstyledButton
        ref={useMergedRef(boxRef, outsideClickRef)}
        onClick={(e) => {
          if (!isOnOptionsNode(e)) {
            toggleOpened()
          }
        }}
        className={classes.box}
        id={id}
      >
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
              name: 'sameWidth',
              enabled: true,
              phase: 'beforeWrite',
              requires: ['computeStyles'],
              fn: ({ state }: any) => {
                state.styles.popper.transform = `translate3d(2px, -${
                  (state?.rects?.reference.height || 0) + Math.round(6 * zoom)
                }px, 0px)`
              },
              effect: ({ state }: any) => {
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
