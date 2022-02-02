import { usePlayerStore } from '../src/store/player'

const Home = () => {
  const { loading, player } = usePlayerStore()
  return (
    <div>
      <p>{String(loading)}</p>
      hi,
      <strong>{player ? player.name : ''}</strong>
    </div>
  )
}

export default Home
