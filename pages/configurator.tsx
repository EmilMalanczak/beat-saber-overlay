import { ActionIcon, Group, Portal, SegmentedControl } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { useState } from 'react'
import { RiAddFill, RiPlayFill, RiPauseFill } from 'react-icons/ri'

import { Navbar } from 'components/Navbar/Navbar'
import { useConfiguratorStoreBare } from 'store/configurator'
import { ScreenType } from 'types/Options'

import { AddElementDrawer } from '../src/components/AddElementDrawer/AddElementDrawer'
import { ConfiguratorCanvas } from '../src/components/ConfiguratorCanvas/ConfiguratorCanvas'
import { EditDrawer } from '../src/components/EditDrawer'
import { generateRandomCut } from '../src/helpers/generateRandomCut'
import { useInterval } from '../src/hooks/useInterval'
import { useCutsStore } from '../src/store/cuts'

const Home = () => {
  const cutNote = useCutsStore((state) => state.cutNote)
  const [activeScreen, setActiveScreen] = useConfiguratorStoreBare((state) => [
    state.activeScreen,
    state.changeActiveScreen
  ])
  const [isDemoOn, toggleDemo] = useBooleanToggle(false)
  const [isEditOpen, setIsEditOpen] = useBooleanToggle(false)
  const [isAddOpen, setAddOpen] = useState(false)

  useInterval(
    () => {
      // @ts-ignore
      cutNote(generateRandomCut())
    },
    isDemoOn ? 500 : null
  )

  return (
    <>
      <Navbar />
      <ConfiguratorCanvas editing={isEditOpen} onEdit={(val) => setIsEditOpen(val)} />
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
          <SegmentedControl
            value={activeScreen}
            onChange={setActiveScreen}
            data={[
              { label: 'Lobby', value: ScreenType.Lobby },
              { label: 'In game', value: ScreenType.InGame }
            ]}
          />
        </Group>
      </Portal>

      <AddElementDrawer opened={isAddOpen} setOpened={setAddOpen} />
      <EditDrawer opened={isEditOpen} setOpened={setIsEditOpen} />
    </>
  )
}

export default Home
