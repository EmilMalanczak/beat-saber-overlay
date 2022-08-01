import { Group } from '@mantine/core'

import { NeonText } from 'features/configurator/elements/other/neon-text'
import { BuyMeACoffee } from 'features/ui/buy-me-a-coffee/buy-me-a-coffee'

export const Navbar = () => (
  <Group
    py={8}
    px={12}
    position="apart"
    sx={(theme) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 5,
      backgroundColor: theme.colors.dark[8],
      borderBottom: `1px solid ${theme.colors.dark[4]}`
    })}
  >
    <Group spacing={8}>
      <NeonText size={24} intensity={100} hue={210}>
        Overlay
      </NeonText>
      <NeonText size={24} intensity={100} hue={0}>
        Generator
      </NeonText>
    </Group>
    <BuyMeACoffee />
  </Group>
)
