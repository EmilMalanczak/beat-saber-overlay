import { NotificationsProvider } from '@mantine/notifications'
import { StrictMode } from 'react'

import type { AppProps } from 'next/app'

import { SocketProvider } from 'features/socket/socket-context'
import { ThemeContext } from 'features/ui/theme-context'

import 'features/ui/styles/global.scss'
import 'features/ui/styles/fonts.scss'

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
