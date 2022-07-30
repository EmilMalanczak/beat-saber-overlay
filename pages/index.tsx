import { createStyles, useMantineTheme } from '@mantine/styles'
import { useState } from 'react'

import { useSongStore } from 'features/beatsaver/song'
import { CutVisualizer } from 'features/configurator/elements/cut-visualizer'
import { HitScoreVisualizer } from 'features/configurator/elements/hit-score-visualizer'
import { generateRandomCut } from 'features/demo/generate-random-cut'
import { usePlayerStore } from 'features/scoresaber/player'
import { useCutsStore } from 'features/socket/store/cuts'
import { useInterval } from 'hooks/use-interval'

export const useStyles = createStyles(() => ({
  visualizers: {
    position: 'absolute',
    bottom: 1,
    right: 70
  },
  wrapper: {
    position: 'relative'
  }
}))

const Home = () => {
  // const { loading, player } = usePlayerStore()
  const theme = useMantineTheme()
  const cutNote = useCutsStore((state) => state.cutNote)
  const [isDemoOn, toggleDemo] = useState(false)
  const { getSong } = useSongStore()
  const { getPlayerInfo } = usePlayerStore()
  const { classes } = useStyles()

  const handleCut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const note = generateRandomCut()
    console.log(note)
    // @ts-ignore
    cutNote(note)
  }

  useInterval(handleCut, isDemoOn ? 50 : null)

  return (
    <>
      <button type="button" onClick={() => toggleDemo((p) => !p)}>
        cut
      </button>

      <button type="button" onClick={() => getSong('8D0EDFBE3A32BABADF699BDB1937A1C0CAE1DBDC')}>
        song
      </button>

      <button type="button" onClick={() => getPlayerInfo('76561199237406046')}>
        player
      </button>

      <div className={classes.visualizers}>
        <div className={classes.wrapper}>
          <CutVisualizer
            cellSize={70}
            fadeTime={50}
            gridColor="#fff"
            gridBorderSize={0}
            style={{
              border: '0px solid white'
            }}
          />

          <div style={{ margin: -30 + (100 - (70 + (Math.SQRT2 - 1.08) * 70)) }} />

          <HitScoreVisualizer
            rows={1}
            width="100%"
            unmountTime={300}
            rowHeight={70 + (Math.SQRT2 - 1.08) * 70}
            // rowHeight={100}
            maxRotate={12}
            scoreCutShift={10}
            // style={{
            //   border: '1px solid white'
            // }}
            style={{}}
            config={[
              {
                above: 113,
                fontSize: 60,
                color: 'rgb(255, 255, 255)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(255, 255, 255)', 0.4)}`
              },
              {
                above: 110,
                fontSize: 58,
                color: 'rgb(242, 0, 242)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 0, 242)', 0.4)}`
              },
              {
                above: 107,
                fontSize: 56,
                color: 'rgb(0, 102, 255)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(0, 102, 255)', 0.4)}`
              },
              {
                above: 100,
                fontSize: 54,
                color: 'rgb(242, 242, 0)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 242, 0)', 0.4)}`
              },
              {
                above: 0,
                fontSize: 52,
                color: 'rgb(255, 102, 0)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(255, 102, 0)', 0.4)}`
              }
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default Home
