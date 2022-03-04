import { CloseButton, Box, Popper, UnstyledButton } from '@mantine/core'
import { useRef, useState } from 'react'
import ReactDraggable from 'react-draggable'

import type { DraggableProps as ReactDraggableProps } from 'react-draggable'
import type { FC } from 'react'

import { useStyles } from './Draggable.styles'

type DraggableProps = Partial<Omit<ReactDraggableProps, 'defaultClassName'>> & {
  onRemove: () => void
}

export const Draggable: FC<DraggableProps> = ({
  bounds = 'parent',
  onDrag,
  onStop,
  defaultPosition,
  children,
  ...rest
}) => {
  const boxRef = useRef<HTMLButtonElement>(null)
  const [opened, setOpened] = useState(false)
  const [position, setPosition] = useState(defaultPosition)

  const { classes } = useStyles()

  return (
    <ReactDraggable
      onStop={onStop}
      bounds={bounds}
      position={position}
      defaultClassName={classes.wrapper}
      onDrag={(_, { x, y }) => {
        setPosition({ x, y })

        if (opened) {
          setOpened(false)
        }
      }}
      {...rest}
    >
      <UnstyledButton ref={boxRef} onClick={() => setOpened((p) => !p)} className={classes.box}>
        {children}
        <Popper<HTMLButtonElement>
          mounted={opened}
          referenceElement={boxRef.current as HTMLButtonElement}
          position="top"
          placement="end"
          withArrow
          forceUpdateDependencies={[position]}
          transition="slide-down"
          withinPortal={false}
        >
          <Box className={classes.options}>
            <CloseButton
              onClick={() => {
                console.log('dupa')
              }}
            />
          </Box>
        </Popper>
      </UnstyledButton>
    </ReactDraggable>
  )
}
