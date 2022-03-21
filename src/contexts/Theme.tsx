import { MantineProvider } from '@mantine/core'
import type { FC } from 'react'

export const ThemeContext: FC = ({ children }) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      fontFamily: 'Montserrat',
      colorScheme: 'dark',
      headings: {
        fontFamily: 'Montserrat, sans-serif'
      }
    }}
    styles={{
      Title: {
        root: {
          color: 'white'
        }
      }
    }}
    emotionOptions={{ key: 'bs', prepend: false }}
  >
    {children}
  </MantineProvider>
)
