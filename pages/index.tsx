import { useMantineTheme } from '@mantine/styles'
import { CutVisualizer } from '../src/components/CutVisualizer'
import { HitScoreVisualizer } from '../src/components/HitScoreVisualizer'
import { NoteBlock } from '../src/components/NoteBlock'
import { useScoreStore } from '../src/store/score'
import { generateRandomCut } from '../src/utils/generateRandomCut'

const Home = () => {
  // const { loading, player } = usePlayerStore()
  const theme = useMantineTheme()
  const { cutNote } = useScoreStore()

  const handleCut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cutNote(generateRandomCut())
  }

  return (
    <>
      {/* #6A0DB3 */}
      {/* <NoteBlock color="rgb(200, 20, 20)" size={400} direction="Up" /> */}
      <CutVisualizer cellSize={50} fadeTime={300000} />
      <span style={{ margin: 20 }} />
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={handleCut}>cut</button>
    </>
    // <HitScoreVisualizer
    //   rows={1}
    //   unmountTime={350}
    //   width={300}
    //   rowHeight={70}
    //   maxRotate={12}
    //   scoreCutShift={15}
    //   config={[
    //     {
    //       above: 113,
    //       fontSize: 22,
    //       color: 'rgb(255, 255, 255)',
    //       WebkitTextStroke: `1px ${theme.fn.darken('rgb(255, 255, 255)', 0.3)}`
    //     },
    //     {
    //       above: 110,
    //       fontSize: 20,
    //       color: 'rgb(242, 0, 242)',
    //       WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 0, 242)', 0.3)}`
    //     },
    //     {
    //       above: 107,
    //       fontSize: 16,
    //       color: 'rgb(0, 102, 255)',
    //       WebkitTextStroke: `1px ${theme.fn.darken('rgb(0, 102, 255)', 0.3)}`
    //     },
    //     {
    //       above: 100,
    //       fontSize: 16,
    //       color: 'rgb(242, 242, 0)',
    //       WebkitTextStroke: `1px ${theme.fn.darken('rgb(242, 242, 0)', 0.3)}`
    //     },
    //     {
    //       above: 0,
    //       fontSize: 16,
    //       color: 'rgb(255, 102, 0)',
    //       WebkitTextStroke: `1px ${theme.fn.darken('rgb(255, 102, 0)', 0.3)}`
    //     }
    //   ]}
    // />
  )
}

export default Home
