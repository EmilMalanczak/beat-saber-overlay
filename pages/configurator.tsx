import { ActionIcon, Group, Portal } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { useState } from 'react'
import { RiAddFill, RiPlayFill, RiPauseFill } from 'react-icons/ri'
import { AddElementDrawer } from '../src/components/AddElementDrawer/AddElementDrawer'

import { useInterval } from '../src/hooks/useInterval'
import { EditDrawer } from '../src/components/EditDrawer'
import { useScoreStore } from '../src/store/score'
import { generateRandomCut } from '../src/helpers/generateRandomCut'
import { ConfiguratorCanvas } from '../src/components/ConfiguratorCanvas/ConfiguratorCanvas'

const Home = () => {
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
      <ConfiguratorCanvas onEdit={(val) => setIsEditOpen(val)} />

      <Portal zIndex={5}>
        <Group
          spacing={8}
          styles={{
            root: {
              position: 'fixed',
              bottom: 16,
              left: 16
            }
          }}
        >
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
