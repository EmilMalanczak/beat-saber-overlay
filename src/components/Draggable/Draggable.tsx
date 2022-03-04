import { Popper, UnstyledButton, ActionIcon, Group } from '@mantine/core'
import { useRef, useState } from 'react'
import ReactDraggable from 'react-draggable'
import { RiDeleteBin7Fill, RiEditFill, RiLockFill, RiLockUnlockFill } from 'react-icons/ri'

import type { DraggableProps as ReactDraggableProps } from 'react-draggable'
import type { FC } from 'react'

import { useClickOutside, useMergedRef } from '@mantine/hooks'
import { useStyles } from './Draggable.styles'

type DraggableProps = Partial<Omit<ReactDraggableProps, 'defaultClassName'>> & {
  onRemove: () => void
  onEdit: () => void
}

export const Draggable: FC<DraggableProps> = ({
  bounds = 'parent',
  onStop,
  onRemove,
  defaultPosition,
  children,
  ...rest
}) => {
  const [opened, setOpened] = useState(false)
  const [isLocked, setLocked] = useState(false)
  const [position, setPosition] = useState(defaultPosition)

  const boxRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const outsideClickRef = useClickOutside(() => setOpened(false))

  const { classes, cx } = useStyles()

  return (
    <ReactDraggable
      onStop={onStop}
      bounds={bounds}
      position={position}
      defaultClassName={cx(classes.wrapper, {
        [classes.active]: opened,
        [classes.disabled]: isLocked
      })}
      disabled={isLocked}
      onDrag={(_, { x, y }) => {
        setPosition({ x, y })

        if (opened) {
          setOpened(false)
        }
      }}
      {...rest}
    >
      <UnstyledButton
        ref={useMergedRef(boxRef, outsideClickRef)}
        onClick={(e: any) => {
          // eslint-disable-next-line operator-linebreak
          const isOptionsClicked =
            optionsRef.current === e.target || optionsRef.current?.contains(e.target)

          if (!isOptionsClicked) {
            setOpened((p) => !p)
          }
        }}
        className={classes.box}
      >
        {children}
        <Popper<HTMLDivElement>
          mounted={opened}
          referenceElement={boxRef.current as HTMLDivElement}
          position="top"
          placement="end"
          withArrow
          forceUpdateDependencies={[position]}
          transition="slide-down"
          withinPortal={false}
        >
          <Group spacing={8} className={classes.options} ref={optionsRef}>
            <ActionIcon
              onClick={() => {
                setLocked((p) => !p)
              }}
            >
              {isLocked ? <RiLockFill /> : <RiLockUnlockFill />}
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                console.log('edit')
              }}
            >
              <RiEditFill />
            </ActionIcon>

            <ActionIcon
              onClick={() => {
                console.log('remove')
                onRemove()
              }}
            >
              <RiDeleteBin7Fill />
            </ActionIcon>
          </Group>
        </Popper>
      </UnstyledButton>
    </ReactDraggable>
  )
}
