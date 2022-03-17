import { ActionIcon, Button, createStyles, Drawer, Group, Portal } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { useState } from 'react'
import { RiAddFill, RiPlayFill, RiPauseFill } from 'react-icons/ri'
import { AddElementDrawer } from '../src/components/AddElementDrawer/AddElementDrawer'

import { Draggable } from '../src/components/Draggable/Draggable'
import { EditDrawer } from '../src/components/EditDrawer'
import { useInterval } from '../src/hooks/useInterval'
import { options } from '../src/options'
import { useConfiguratorStore } from '../src/store/configurator'
import { useScoreStore } from '../src/store/score'
import { Option } from '../src/types/Options'
import { generateRandomCut } from '../src/utils/generateRandomCut'

const useStyles = createStyles(() => ({
  canvas: {
    margin: 20,
    marginLeft: 'auto',
    border: '1px solid red',
    height: 600,
    width: 1000,
    position: 'relative',
    overflow: 'auto',
    padding: 20
  },
  controls: {
    position: 'fixed',
    bottom: 16,
    left: 16
  }
}))

const Home = () => {
  const { classes } = useStyles()

  const { dragElement, elements, removeElement, selectElement } = useConfiguratorStore()

  const cutNote = useScoreStore((state) => state.cutNote)
  const [isDemoOn, toggleDemo] = useBooleanToggle(true)
  const [isEditOpen, setIsEditOpen] = useBooleanToggle(false)
  const [isAddOpen, setAddOpen] = useState(false)

  useInterval(
    () => {
      // @ts-ignore
      cutNote(generateRandomCut())
    },
    isDemoOn ? 150 : null
  )

  return (
    <>
      <div className={classes.canvas}>
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

          console.log(elementProps)

          return (
            <Draggable
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
                setIsEditOpen(true)
                selectElement(slug)
              }}
            >
              <Item
                {...elementProps}
                //   gridBorderSize={1}
              />
            </Draggable>
          )
        })}
      </div>

      <Portal zIndex={5}>
        <Group spacing={8} className={classes.controls}>
          <ActionIcon
            color="blue"
            size="xl"
            radius="xl"
            variant="filled"
            onClick={() => setAddOpen(true)}
          >
            <RiAddFill size={20} />
          </ActionIcon>

          <ActionIcon
            color="blue"
            size="xl"
            radius="xl"
            variant="filled"
            onClick={() => toggleDemo((p) => !p)}
          >
            {isDemoOn ? <RiPauseFill size={20} /> : <RiPlayFill size={20} />}
          </ActionIcon>
        </Group>
      </Portal>

      <AddElementDrawer opened={isAddOpen} setOpened={setAddOpen} />
      <EditDrawer opened={isEditOpen} setOpened={setIsEditOpen} />
    </>
  )
}

export default Home
