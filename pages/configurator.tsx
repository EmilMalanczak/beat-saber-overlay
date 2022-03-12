import { ActionIcon, Button, createStyles, Drawer, Group, Portal } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { values } from 'ramda'
import { useState } from 'react'
import { RiAddFill, RiPlayFill, RiPauseFill } from 'react-icons/ri'

import { Draggable } from '../src/components/Draggable/Draggable'
import { EditDrawer } from '../src/components/EditDrawer'
import { useInterval } from '../src/hooks/useInterval'
import { options } from '../src/options'
import { useConfiguratorStore } from '../src/store/configurator'
import { useScoreStore } from '../src/store/score'
import { generateRandomCut } from '../src/utils/generateRandomCut'

const useStyles = createStyles(() => ({
  canvas: {
    margin: 20,
    marginLeft: 'auto',
    border: '1px solid red',
    height: 480,
    width: 720,
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
  const [opened, setOpened] = useState(false)

  const { dragElement, addElement, elements, removeElement, selectElement } = useConfiguratorStore()

  const cutNote = useScoreStore((state) => state.cutNote)
  const [isDemoOn, toggleDemo] = useBooleanToggle(false)
  const [isEditOpen, setIsEditOpen] = useBooleanToggle(false)

  console.log({
    elements
  })

  useInterval(
    () => {
      // @ts-ignore
      cutNote(generateRandomCut())
    },
    isDemoOn ? 100 : null
  )

  return (
    <>
      <div className={classes.canvas}>
        {Object.values(elements).map(({ name, slug, options: elementOptions }) => {
          const Item = options.find((opt) => opt.name === name)?.component

          if (!Item) return null

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
                {...{
                  ...elementOptions.reduce(
                    (acc, item) => ({
                      ...acc,
                      ...{ ...(item?.propName ? { [item.propName]: item.value } : {}) }
                    }),
                    {}
                  ),
                  gridBorderSize: 1
                }}
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
            onClick={() => setOpened(true)}
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

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add element"
        padding="xl"
        size="xl"
      >
        <Group direction="column" spacing={16}>
          {options.map((component) => (
            <Button
              onClick={() => {
                addElement(component)
                setOpened(false)
              }}
            >
              {`add ${component.name}`}
            </Button>
          ))}
        </Group>
      </Drawer>

      <EditDrawer opened={isEditOpen} setOpened={setIsEditOpen} />
    </>
  )
}

export default Home
