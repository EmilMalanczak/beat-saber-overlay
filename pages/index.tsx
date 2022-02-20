import { createStyles, useMantineTheme } from '@mantine/styles'
import { CutVisualizer } from '../src/components/CutVisualizer'
import { HitScoreVisualizer } from '../src/components/HitScoreVisualizer'
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
  const { cutNote } = useScoreStore()
  const { classes } = useStyles()

  const handleCut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const note = generateRandomCut()
    console.log(note)
    // @ts-ignore
    cutNote(note)
  }
  const unmountTime = 350
  const width = 600

  return (
    <>
      {/* <button type="button" onClick={handleCut}>
        cut
      </button> */}

      <div className={classes.visualizers}>
        <div className={classes.wrapper}>
          <CutVisualizer
            gap={undefined}
            cellSize={60}
            fadeTime={unmountTime}
            gridColor="#000"
            gridBorderSize={2}
            style={{
              border: '1px solid red',
              opacity: 0.8
            }}
          />

          <div style={{ margin: 30 }} />

          <HitScoreVisualizer
            rows={1}
            width="100%"
            unmountTime={unmountTime}
            rowHeight={100}
            maxRotate={12}
            scoreCutShift={10}
            style={{
              border: '1px solid red'
            }}
            config={[
              {
                above: 113,
                fontSize: 40,
                color: 'rgb(255, 255, 255)',
                textShadow: 'rgb(255, 255, 255) 1px 1px 5px',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(255, 255, 255)', 0.4)}`
              },
              {
                above: 110,
                fontSize: 38,
                color: 'rgb(242, 0, 242)',
                // textShadow: 'rgb(242, 0, 242) 1px 1px 10px',
                textShadow: 'rgb(255, 255, 255) 1px 1px 5px',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 0, 242)', 0.4)}`
              },
              {
                above: 107,
                fontSize: 36,
                color: 'rgb(0, 102, 255)',
                // textShadow: 'rgb(0, 102, 255) 1px 1px 10px',
                textShadow: 'rgb(255, 255, 255) 1px 1px 5px',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(0, 102, 255)', 0.4)}`
              },
              {
                above: 100,
                fontSize: 34,
                color: 'rgb(242, 242, 0)',
                // textShadow: 'rgb(242, 242, 0) 1px 1px 10px',
                textShadow: 'rgb(255, 255, 255) 1px 1px 5px',
                WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 242, 0)', 0.4)}`
              },
              {
                above: 0,
                fontSize: 32,
                color: 'rgb(255, 102, 0)',
                // textShadow: 'rgb(255, 102, 0) 1px 1px 10px',
                textShadow: 'rgb(255, 255, 255) 1px 1px 5px',
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
