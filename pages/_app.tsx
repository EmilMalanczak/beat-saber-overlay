import type { AppProps } from 'next/app'

import { SocketIOProvider } from '../src/contexts/SocketIO'

const App = ({ Component, pageProps }: AppProps) => (
  <SocketIOProvider>
    <Component {...pageProps} />
  </SocketIOProvider>
)

export default App
