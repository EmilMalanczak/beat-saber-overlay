import { NotificationsProvider } from '@mantine/notifications'

import type { AppProps } from 'next/app'

import { ThemeContext } from 'features/ui/theme-context'

import 'features/ui/styles/global.scss'
import 'features/ui/styles/fonts.scss'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeContext>
    <NotificationsProvider>
      <Component {...pageProps} />
    </NotificationsProvider>
  </ThemeContext>
)

export default App
