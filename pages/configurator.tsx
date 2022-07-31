import { ActionIcon, Group, Portal, SegmentedControl } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { RiAddFill, RiPlayFill, RiPauseFill } from 'react-icons/ri'

import { HP_COSTS } from 'constants/score'
import { useSongStore } from 'features/beatsaver/song'
import { SongDifficultyEnum } from 'features/beatsaver/types/song'
import { AddElementDrawer } from 'features/configurator/add-element-drawer/add-element-drawer'
import { ConfiguratorCanvas } from 'features/configurator/canvas/configurator-canvas'
import { ConfiguratorWelcomeModal } from 'features/configurator/configurator-welcome-modal/configurator-welcome-modal'
import { EditDrawer } from 'features/configurator/edit-element-drawer'
import { ScreenType } from 'features/configurator/options/types/options'
import { useConfiguratorStore } from 'features/configurator/store/configurator'
import { generateRandomCut } from 'features/demo/generate-random-cut'
import { usePlayerStore } from 'features/scoresaber/player'
import { useCutsStore } from 'features/socket/store/cuts'
import { useScoreStore } from 'features/socket/store/score'
import { Navbar } from 'features/ui/navbar/navbar'
import { useInterval } from 'hooks/use-interval'
import { useLocalStorage } from 'hooks/use-local-storage'
import { randomInt } from 'utils/random-int'

const Home = () => {
  const cutNote = useCutsStore((state) => state.cutNote)
  const [activeScreen, setActiveScreen] = useConfiguratorStore((state) => [
    state.activeScreen,
    state.changeActiveScreen
  ])
  const [playerId] = useLocalStorage('scoresaber-player-id', '')

  const getPlayerInfo = usePlayerStore((state) => state.getPlayerInfo)
  const getSong = useSongStore((state) => state.getSong)
  const setDifficulty = useSongStore((state) => state.setDifficulty)
  const { increaseHealth, decreaseHealth } = useScoreStore()
  const [isDemoOn, toggleDemo] = useBooleanToggle(false)
  const [isEditOpen, setIsEditOpen] = useBooleanToggle(false)
  const [isAddOpen, setAddOpen] = useState(false)

  useInterval(
    () => {
      // @ts-ignore
      cutNote(generateRandomCut())

      const x = randomInt(0, 25)
      if (x > 1) {
        increaseHealth(HP_COSTS.correctCut)
      } else {
        decreaseHealth(HP_COSTS.miss)
      }
    },
    isDemoOn ? 100 : null
  )

  useEffect(() => {
    getPlayerInfo('76561199237406046')
    getSong('8D0EDFBE3A32BABADF699BDB1937A1C0CAE1DBDC')
    setDifficulty({
      base: SongDifficultyEnum.ExpertPlus,
      custom: 'Zajebiście ciężkie'
    })
  }, [])

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
      <ConfiguratorWelcomeModal opened={!playerId} />
    </>
  )
}

export default Home
