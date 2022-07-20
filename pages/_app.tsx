import { NotificationsProvider } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import type { AppProps } from 'next/app'

import { SocketProvider } from '../src/contexts/Socket'
import { ThemeContext } from '../src/contexts/Theme'
import { usePlayerStore } from '../src/store/player'

import '../src/styles/global.scss'
import '../src/styles/fonts.scss'

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
      <NotificationsProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </NotificationsProvider>
    </ThemeContext>
  )
}

export default App
