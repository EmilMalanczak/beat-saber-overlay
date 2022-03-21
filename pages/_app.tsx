import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'

import { usePlayerStore } from '../src/store/player'
import { SocketProvider } from '../src/contexts/Socket'
import { ThemeContext } from '../src/contexts/Theme'

import '../src/styles/global.scss'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { getPlayerInfo } = usePlayerStore()

  useEffect(() => {
    if (router.query.id) {
      getPlayerInfo(router.query.id as string)
    }
  }, [getPlayerInfo, router.query.id])

  return (
    <ThemeContext>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </ThemeContext>
  )
}

export default App
