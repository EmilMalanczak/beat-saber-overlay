import { MantineProvider } from '@mantine/core'
import type { FC } from 'react'

export const ThemeContext: FC = ({ children }) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ fontFamily: 'Montserrat', colorScheme: 'dark' }}
    emotionOptions={{ key: 'bs', prepend: false }}
  >
    {children}
  </MantineProvider>
)
