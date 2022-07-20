import { Group, Paper } from '@mantine/core'

import { BuyMeACoffee } from 'components/BuyMeACoffee/BuyMeACoffee'
import { NeonText } from 'components/NeonText'

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
