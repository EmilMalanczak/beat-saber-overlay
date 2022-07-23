import { ActionIcon, Group, Popper } from '@mantine/core'
import { RiDeleteBin7Fill, RiEditFill, RiLockFill, RiLockUnlockFill } from 'react-icons/ri'

import type { VFC, RefObject, CSSProperties, MouseEventHandler } from 'react'

import { useStyles } from './draggable-options.styles'

type DraggableOptionsProps = {
  visible: boolean
  locked: boolean
  zoom: number
  onEdit: MouseEventHandler<HTMLButtonElement>
  onRemove: MouseEventHandler<HTMLButtonElement>
  onLock: MouseEventHandler<HTMLButtonElement>
  forceUpdateDependencies: any[]
  boxRef: RefObject<HTMLDivElement>
  optionsRef: RefObject<HTMLDivElement>
}

export const DraggableOptions: VFC<DraggableOptionsProps> = ({
  visible,
  locked,
  forceUpdateDependencies,
  zoom,
  onEdit,
  onLock,
  onRemove,
  boxRef,
  optionsRef
}) => {
  const { classes, cx } = useStyles()

  return (
    <Popper<HTMLDivElement>
      mounted={visible}
      referenceElement={boxRef.current as HTMLDivElement}
      placement="end"
      withArrow={false}
      gutter={6}
      forceUpdateDependencies={forceUpdateDependencies}
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
            const { placement, rects } = state
            const isBottom = placement.includes('bottom')
            const isRight = placement.includes('end')

            state.styles.popper.transform = `translate3d(${isRight ? 4 : -4}px, -${
              isBottom ? 0 : rects?.reference.height || 0
            }px, 0px) scale(${1 / zoom})`
          }
        },
        {
          // its needed because of incremental zooming
          // @ts-ignore
          name: 'transformOriginControl',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }: any) => {
            const { placement } = state

            state.styles.popper['transform-origin'] = `${
              placement.includes('top') ? 'bottom' : 'top'
            } ${state.placement.includes('start') ? 'left' : 'right'}`
          }
        }
      ]}
    >
      <Group
        spacing={8}
        className={cx(classes.options, 'options')}
        ref={optionsRef}
        style={
          {
            '--options-scale': 1,
            '--options-offset': `${6 * zoom}px`
          } as CSSProperties
        }
      >
        <ActionIcon onClick={onLock}>{locked ? <RiLockFill /> : <RiLockUnlockFill />}</ActionIcon>
        <ActionIcon onClick={onEdit}>
          <RiEditFill />
        </ActionIcon>

        <ActionIcon onClick={onRemove}>
          <RiDeleteBin7Fill />
        </ActionIcon>
      </Group>
    </Popper>
  )
}
