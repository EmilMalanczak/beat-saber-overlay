import { ActionIcon, Button, createStyles, Drawer, Group } from '@mantine/core'
import { useState } from 'react'
import { Draggable } from '../src/components/Draggable/Draggable'
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
  }
}))

const Home = () => {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(false)

  const { dragElement, addElement, elements, removeElement } = useConfiguratorStore()

  const cutNote = useScoreStore((state) => state.cutNote)
  const [isDemoOn, toggleDemo] = useState(false)

  useInterval(
    () => {
      // @ts-ignore
      cutNote(generateRandomCut())
    },
    isDemoOn ? 100 : null
  )

  return (
    <>
      <button type="button" onClick={() => toggleDemo((p) => !p)}>
        cut
      </button>

      <div className={classes.canvas}>
        {Object.values(elements).map(({ name, slug, defaultProps }) => {
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
              onRemove={() => {
                removeElement(slug)
              }}
              onEdit={() => {
                console.log('edit', slug)
              }}
            >
              <Item
                {...{ ...defaultProps, gridBorderSize: 1 }}
                //   gridBorderSize={1}
              />
            </Draggable>
          )
        })}
      </div>
      <ActionIcon
        color="blue"
        size="xl"
        radius="xl"
        variant="filled"
        onClick={() => setOpened(true)}
      >
        +
      </ActionIcon>

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
              }}
            >
              {`add ${component.name}`}
            </Button>
          ))}
        </Group>
      </Drawer>
    </>
  )
}

export default Home
