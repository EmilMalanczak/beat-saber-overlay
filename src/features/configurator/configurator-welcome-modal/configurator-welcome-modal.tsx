import {
  ActionIcon,
  Group,
  Modal,
  NumberInput,
  Popover,
  TextInput,
  Text,
  Anchor,
  Divider,
  Title,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { showNotification, updateNotification } from '@mantine/notifications'
import { useEffect, useState, VFC } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FiInfo } from 'react-icons/fi'

import { api } from 'constants/api'
import { scoresaber } from 'features/scoresaber/scoresaber'
import { Player, PlayerDto } from 'features/scoresaber/types/player'
import { transformUserDto } from 'features/scoresaber/user-dto'
import { useLocalStorage } from 'hooks/use-local-storage'

import { ScoresaberProfileConfirmation } from './scoresaber-profile-confirmation'

import { getInitialZoom } from '../helpers/get-initial-zoom'
import { useSyncedConfiguratorStore } from '../store/configurator'

type ConfiguratorWelcomeModalProps = {
  opened: boolean
}

export const ConfiguratorWelcomeModal: VFC<ConfiguratorWelcomeModalProps> = ({ opened }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [player, setPlayer] = useState<PlayerDto | null>(null)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const setCanvas = useSyncedConfiguratorStore((state) => state.setCanvas)
  const [, setPlayerId] = useLocalStorage('scoresaber-player-id', '')

  // TODO add is that you
  const form = useForm({
    initialValues: {
      width: 1920,
      height: 1080,
      id: ''
    },
    validationRules: {
      width: (w) => !!w,
      height: (h) => !!h,
      id: (id) => !!id
    },
    errorMessages: {
      width: 'Width is required',
      height: 'Height is required',
      id: 'Id is required'
    }
  })

  const handleSubmit = async (data: any) => {
    try {
      showNotification({
        id: 'load-data',
        loading: true,
        title: 'Fetching your Scoresaber profile...',
        message: 'Data will be loaded soon, you cannot close this yet',
        autoClose: false,
        disallowClose: true
      })

      const { data: scoresaberPlayer } = await api.get<Player>(`/scoresaber/player/${data.id}`)

      updateNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Profile was loaded',
        message: 'Check if it is correct',
        autoClose: 3000,
        icon: <BsFillCheckCircleFill size={16} />
      })

      setPlayer(transformUserDto(scoresaberPlayer))
      setConfirmationOpen(true)
    } catch (e) {
      console.error(e)
      showNotification({
        title: 'Error',
        message: 'Something went wrong, try again later',
        color: 'red'
      })
    }
  }

  useEffect(() => {
    form.setFieldValue('width', window.outerWidth)
    form.setFieldValue('height', window.outerHeight)
  }, [])

  return (
    <>
      <Modal
        opened={opened}
        centered
        withCloseButton={false}
        onClose={() => {
          console.log(' ')
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group direction="column" align="stretch" spacing={20}>
            <div>
              <Title order={3}>Welcome to the configurator!</Title>
              <Title order={6}>We will need few things before begin:</Title>
            </div>

            <TextInput
              label="Scoresaber ID"
              placeholder="Eg. 76561199237406046"
              required
              rightSection={
                <Popover
                  opened={tooltipVisible}
                  target={
                    <ActionIcon onClick={() => setTooltipVisible((p) => !p)}>
                      <FiInfo />
                    </ActionIcon>
                  }
                  width={240}
                  position="top"
                  withArrow
                  shadow="md"
                >
                  <Text size="sm">
                    <span>Navigate to your </span>
                    <Anchor size="sm" href="https://scoresaber.com/" target="_blank">
                      Scoresaber
                    </Anchor>
                    <span> profile and copy the ID from the URL.</span>
                  </Text>
                </Popover>
              }
              {...form.getInputProps('id')}
            />
            <Divider />
            <Text size="sm" weight={500}>
              Provide your OBS layer size in px
            </Text>
            <Group noWrap>
              <NumberInput label="width" required {...form.getInputProps('width')} />
              <NumberInput label="height" required {...form.getInputProps('height')} />
            </Group>
            <Button my={20} type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      {player && (
        <ScoresaberProfileConfirmation
          opened={confirmationOpen}
          player={player}
          onDecline={() => {
            setPlayer(null)
            setConfirmationOpen(false)
          }}
          onConfirm={() => {
            const canvasSize = {
              width: form.values.width,
              height: form.values.height
            }
            setCanvas({
              ...canvasSize,
              zoom: getInitialZoom(canvasSize)
            })
            setPlayerId(form.values.id)
            setConfirmationOpen(false)
          }}
        />
      )}
    </>
  )
}
