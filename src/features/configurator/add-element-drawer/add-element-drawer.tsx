import {
  Box,
  Drawer,
  Grid,
  Group,
  Paper,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton
} from '@mantine/core'
import { VFC } from 'react'

import { groupedOptionsByCategory } from 'features/configurator/options/index'
import { useSyncedConfiguratorStore } from 'features/configurator/store/configurator'

import { ElementsCategory } from '../options/types/options'

type AddElementDrawerProps = {
  opened: boolean
  setOpened: (value: boolean) => void
}

const categoryOrder: { name: ElementsCategory; icon: JSX.Element }[] = [
  {
    name: 'visualizer',
    icon: (
      <svg
        stroke="#fff"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <desc />
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="9.5" cy="9.5" r="6.5" />
        <rect x="10" y="10" width="11" height="11" rx="2" />
      </svg>
    )
  },
  {
    name: 'song',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 1280 1280">
        <path
          fill="#fff"
          d="M1014,1160c39,5,63-3,75.87-31.69l0,0c13.53-32.46-1.82-69.75-34.28-83.27L708.07,900.22l71.48-37.92  l321.62,145.05c32.72,14.76,71.2,0.2,85.96-32.52v0c7.38-16.36,8.52-35.88,3.74-53.15c-0.68-2.47-1.5-4.8-2.41-7.02l8.48-529.63  c0.33-20.64-16.13-37.64-36.77-37.97l0,0c-20.64-0.33-37.64,16.13-37.97,36.77l-7.66,478.4C974.56,800.83,832.1,745.34,692.3,683.52  c5.01,0.61,10.11,0.93,15.28,0.93c69.05,0,125.03-55.98,125.03-125.03S776.63,434.4,707.58,434.4s-125.03,55.98-125.03,125.03  c0,37.23,16.28,70.65,42.1,93.56c-142.4-65.53-282.26-137.13-424.6-202.8L409.6,121.57c11.1-17.41,5.99-40.51-11.42-51.61l0,0  c-17.41-11.1-40.51-5.99-51.61,11.42L126.42,426.63c-25.08,3.05-49.73,19.87-60.04,42.73l0,0c-14.76,32.72-0.2,71.2,32.52,85.96  l313.11,141.22l-68.3,175.18l-88.76,86.09c-20.92,20.29-25.68,50.93-14.09,75.96c3.82,8.45,9.46,16.24,16.9,22.74l115.03,100.42  c27.77,24.24,69.93,21.38,94.17-6.38h0c24.24-27.77,21.38-69.93-6.38-94.17l-60.8-53.08l19.39-18.81h130.07l0.02-0.01L1014,1160z"
        />
      </svg>
    )
  },
  {
    name: 'player',
    icon: (
      <svg
        stroke="#fff"
        fill="#fff"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        </g>
      </svg>
    )
  },
  {
    name: 'other',
    icon: (
      <svg
        stroke="#fff"
        fill="#fff"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5.33 3.271a3.5 3.5 0 0 1 4.472 4.474L20.647 18.59l-2.122 2.121L7.68 9.867a3.5 3.5 0 0 1-4.472-4.474L5.444 7.63a1.5 1.5 0 1 0 2.121-2.121L5.329 3.27zm10.367 1.884l3.182-1.768 1.414 1.414-1.768 3.182-1.768.354-2.12 2.121-1.415-1.414 2.121-2.121.354-1.768zm-7.071 7.778l2.121 2.122-4.95 4.95A1.5 1.5 0 0 1 3.58 17.99l.097-.107 4.95-4.95z" />
        </g>
      </svg>
    )
  }
]

export const AddElementDrawer: VFC<AddElementDrawerProps> = ({ opened, setOpened }) => {
  const { addElement, activeScreen } = useSyncedConfiguratorStore((state) => ({
    addElement: state.addElement,
    activeScreen: state.activeScreen
  }))

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title order={4}>Add element</Title>}
      padding="xl"
      size="xl"
      styles={(theme) => ({
        drawer: {
          backgroundColor: theme.colors.dark[8]
        }
      })}
    >
      <Box
        sx={(theme) => ({
          height: 'calc(100% - 48px)',
          position: 'relative',
          display: 'flex',
          overflowY: 'scroll',

          /* Firefox */
          '&': {
            scrollbarWidth: 10 as any, // idk
            scrollbarColor: `${theme.colors.dark[7]} ${theme.colors.dark[2]}`
          },

          /* Chrome, Edge, and Safari */
          '&::-webkit-scrollbar': {
            width: 10 as any // idk
          },

          '&::-webkit-scrollbar-track': {
            background: theme.colors.dark[7]
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.colors.dark[2],
            borderRadius: 6,
            border: `2px solid ${theme.colors.dark[6]}`
          }
        })}
      >
        <Group direction="column" spacing={32} style={{ height: '100%', width: '100%' }} noWrap>
          {Object.entries(groupedOptionsByCategory)
            .sort(([a], [b]) => {
              // ts says that's a string after conversion
              const shouldReorder =
                categoryOrder.findIndex(({ name }) => name === a) >
                categoryOrder.findIndex(({ name }) => name === b)
              return shouldReorder ? 1 : -1
            })
            .map(([category, options], i) => (
              <Grid gutter={8} style={{ width: '100%' }}>
                <Grid.Col span={12}>
                  <Group spacing={12} pb={8}>
                    <ThemeIcon
                      size="lg"
                      radius="md"
                      variant="gradient"
                      gradient={{ deg: 0, from: 'blue', to: 'teal' }}
                    >
                      {categoryOrder[i].icon}
                    </ThemeIcon>
                    <Title
                      sx={{
                        '&::first-letter': {
                          textTransform: 'capitalize'
                        }
                      }}
                      order={5}
                    >
                      {category}
                    </Title>
                  </Group>
                </Grid.Col>
                {options
                  .filter((option) => option.screen.some((screen) => screen === activeScreen))
                  .map((component) => (
                    <Grid.Col span={6}>
                      <Paper
                        key={component.slug}
                        shadow="xs"
                        component={UnstyledButton}
                        p={8}
                        withBorder
                        style={{
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        onClick={() => {
                          addElement(component)
                          setOpened(false)
                        }}
                      >
                        <Title order={6}>{component.name}</Title>
                        <Text size="xs">{component.description}</Text>
                      </Paper>
                    </Grid.Col>
                  ))}
              </Grid>
            ))}
        </Group>
      </Box>
    </Drawer>
  )
}
