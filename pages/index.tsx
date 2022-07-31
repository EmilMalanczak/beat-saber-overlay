import { useEffect, useMemo, useState } from 'react'

import { CANVAS_PADDING } from 'constants/dom'
import { useSongStore } from 'features/beatsaver/song'
import { getConfiguratorItemComponent } from 'features/configurator/helpers/get-configurator-item-component'
import { getConfiguratorItemProps } from 'features/configurator/helpers/get-configurator-item-props'
import {
  LocalStorageConfig,
  useSyncedConfiguratorStore
} from 'features/configurator/store/configurator'
import { generateRandomCut } from 'features/demo/generate-random-cut'
import { usePlayerStore } from 'features/scoresaber/player'
import { SocketProvider } from 'features/socket/socket-context'
import { useCutsStore } from 'features/socket/store/cuts'
import { useInterval } from 'hooks/use-interval'
import { useLocalStorage } from 'hooks/use-local-storage'
import { parseJSON } from 'utils/parseJSON'

const Home = () => {
  const cutNote = useCutsStore((state) => state.cutNote)
  const [isDemoOn, toggleDemo] = useState(false)
  const { getSong } = useSongStore()
  const { getPlayerInfo } = usePlayerStore()
  const { activeScreen } = useSyncedConfiguratorStore((state) => ({
    activeScreen: state.activeScreen,
    canvas: state.canvas
  }))
  const [config] = useLocalStorage('overlay-config', '')
  const [parsedConfig, setParsedConfig] = useState<LocalStorageConfig>()

  // const parsedConfig = useMemo(() => parseJSON<LocalStorageConfig>(config), [config])

  const handleCut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const note = generateRandomCut()
    console.log(note)
    // @ts-ignore
    cutNote(note)
  }

  useInterval(handleCut, isDemoOn ? 50 : null)

  useEffect(() => {
    setParsedConfig(parseJSON<LocalStorageConfig>(config))
  }, [config])

  return (
    <SocketProvider>
      <div
        style={{
          position: 'absolute',
          zIndex: 10
        }}
      >
        <button type="button" onClick={() => toggleDemo((p) => !p)}>
          cut
        </button>

        <button type="button" onClick={() => getSong('8D0EDFBE3A32BABADF699BDB1937A1C0CAE1DBDC')}>
          song
        </button>

        <button type="button" onClick={() => getPlayerInfo('76561199237406046')}>
          player
        </button>
      </div>

      <div
        style={{
          width: parsedConfig?.canvas.width,
          height: parsedConfig?.canvas.height,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {parsedConfig?.elements[activeScreen].map(({ name, options: elementOptions, cords }) => {
          const Item = getConfiguratorItemComponent(name)

          if (!Item) return null

          const elementProps = getConfiguratorItemProps(elementOptions)

          return (
            <div
              id={name}
              style={{
                transform: `translate3d(${cords.x + CANVAS_PADDING}px, ${
                  cords.y + CANVAS_PADDING
                }px, 0)`,
                position: 'absolute',
                top: 0,
                left: 0
              }}
            >
              <Item {...elementProps} />
            </div>
          )
        })}
      </div>
    </SocketProvider>
  )
}

export default Home
