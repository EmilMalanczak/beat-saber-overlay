import { NotificationsProvider } from '@mantine/notifications'
import { StrictMode } from 'react'

import type { AppProps } from 'next/app'

import { SocketProvider } from '../src/contexts/Socket'
import { ThemeContext } from '../src/contexts/Theme'

import '../src/styles/global.scss'
import '../src/styles/fonts.scss'

const App = ({ Component, pageProps }: AppProps) => (
  <StrictMode>
    <ThemeContext>
      <NotificationsProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </NotificationsProvider>
    </ThemeContext>
  </StrictMode>
)

export default App
