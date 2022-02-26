import { useState } from 'react'
import { createStyles, useMantineTheme } from '@mantine/styles'

import { CutVisualizer } from '../src/components/CutVisualizer'
import { HitScoreVisualizer } from '../src/components/HitScoreVisualizer'
import { useInterval } from '../src/hooks/useInterval'
import { useScoreStore } from '../src/store/score'
import { generateRandomCut } from '../src/utils/generateRandomCut'

export const useStyles = createStyles(() => ({
  visualizers: {
    position: 'absolute',
    left: 30,
    bottom: 30
  },
  wrapper: {
    position: 'relative'
  }
}))

const Home = () => {
  // const { loading, player } = usePlayerStore()
  const theme = useMantineTheme()
  const cutNote = useScoreStore((state) => state.cutNote)
  const { classes } = useStyles()
  const [isDemoOn, toggleDemo] = useState(false)

  const handleCut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const note = generateRandomCut()
    console.log(note)
    // @ts-ignore
    cutNote(note)
  }
  const unmountTime = 350

  useInterval(
    () => {
      handleCut()
    },
    isDemoOn ? 1 : null
  )

  return (
    <>
      <button type="button" onClick={() => toggleDemo((p) => !p)}>
        cut
      </button>

      <div className={classes.visualizers}>
        <div className={classes.wrapper}>
          <CutVisualizer
            gap={undefined}
            cellSize={100}
            fadeTime={unmountTime}
            gridColor="#000"
            gridBorderSize={2}
            style={{
              border: '1px solid red'
            }}
          />

          <div style={{ margin: 30 }} />

          <HitScoreVisualizer
            rows={1}
            width={400}
            unmountTime={unmountTime}
            rowHeight={100}
            maxRotate={12}
            scoreCutShift={10}
            style={{
              border: '1px solid red'
              // width: '100%'
            }}
            config={[
              {
                above: 113,
                fontSize: 40,
                color: 'rgb(255, 255, 255)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(255, 255, 255)', 0.4)}`
              },
              {
                above: 110,
                fontSize: 38,
                color: 'rgb(242, 0, 242)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 0, 242)', 0.4)}`
              },
              {
                above: 107,
                fontSize: 36,
                color: 'rgb(0, 102, 255)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(0, 102, 255)', 0.4)}`
              },
              {
                above: 100,
                fontSize: 34,
                color: 'rgb(242, 242, 0)',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 242, 0)', 0.4)}`
              },
              {
                above: 0,
                fontSize: 32,
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
