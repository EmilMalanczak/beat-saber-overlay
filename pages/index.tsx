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

  useInterval(
    () => {
      handleCut()
    },
    isDemoOn ? 50 : null
  )

  return (
    <>
      <button type="button" onClick={() => toggleDemo((p) => !p)}>
        cut
      </button>

      <div className={classes.visualizers}>
        <div className={classes.wrapper}>
          <CutVisualizer
            cellSize={70}
            fadeTime={150}
            gridColor="#000"
            gridBorderSize={0}
            style={{
              border: '1px solid red'
            }}
          />

          <div style={{ margin: -20 - (100 - (70 + (Math.SQRT2 - 1.08) * 70)) }} />

          <HitScoreVisualizer
            rows={1}
            width="100%"
            unmountTime={350}
            rowHeight={70 + (Math.SQRT2 - 1.08) * 70}
            // rowHeight={100}
            maxRotate={12}
            scoreCutShift={10}
            style={{
              border: '1px solid red'
            }}
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
