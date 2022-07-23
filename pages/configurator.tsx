import { ActionIcon, Group, Portal, SegmentedControl } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { useState } from 'react'
import { RiAddFill, RiPlayFill, RiPauseFill } from 'react-icons/ri'

import { AddElementDrawer } from 'features/configurator/add-element-drawer/add-element-drawer'
import { ConfiguratorCanvas } from 'features/configurator/canvas/configurator-canvas'
import { EditDrawer } from 'features/configurator/edit-drawer'
import { ScreenType } from 'features/configurator/options/types/options'
import { useConfiguratorStoreBare } from 'features/configurator/store/configurator'
import { generateRandomCut } from 'features/demo/generate-random-cut'
import { useCutsStore } from 'features/socket/store/cuts'
import { Navbar } from 'features/ui/navbar/navbar'
import { useInterval } from 'hooks/use-interval'

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
