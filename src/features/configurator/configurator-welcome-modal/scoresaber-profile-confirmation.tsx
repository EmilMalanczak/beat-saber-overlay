import { Divider, Group, Title, Text, Button, Modal } from '@mantine/core'
import { VFC } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { FaGlobeAmericas } from 'react-icons/fa'

import { PlayerDto } from 'features/scoresaber/types/player'

type Props = {
  player: PlayerDto
  onConfirm: () => void
  onDecline: () => void
  opened: boolean
}

export const ScoresaberProfileConfirmation: VFC<Props> = ({
  player,
  onDecline,
  onConfirm,
  opened
}) => (
  <Modal
    centered
    title={<Title order={5}>Is that you?</Title>}
    opened={opened}
    onClose={() => {
      console.log('x')
    }}
    withCloseButton={false}
  >
    {player && (
      <Group direction="column" align="stretch" spacing={20}>
        <Group spacing={16} align="flex-start">
          <img
            width={64}
            height={64}
            src={player?.profilePicture}
            alt={`player ${player?.name} avatar`}
          />
          <Group direction="column" style={{ justifyContent: 'flex-start' }} spacing={8}>
            <Group spacing={8} align="center">
              <div
                style={{
                  width: 18,
                  height: 13,
                  borderRadius: 3,
                  overflow: 'hidden'
                }}
              >
                <ReactCountryFlag
                  countryCode={player!.country}
                  svg
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <Text size="md" weight={500}>
                {player?.name}
              </Text>
              <Divider sx={{ height: 20 }} orientation="vertical" />
              <Text size="sm">{`${player?.pp}pp`}</Text>
            </Group>
            <Group spacing={12}>
              <Group spacing={6} align="center">
                <FaGlobeAmericas size={12} />
                <Text size="sm" style={{ lineHeight: 1 }}>{`#${player?.rank}`}</Text>
              </Group>
              <Divider sx={{ height: 20 }} orientation="vertical" />

              <Group spacing={6} align="center">
                <div
                  style={{
                    width: 18,
                    height: 13,
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}
                >
                  <ReactCountryFlag
                    countryCode={player!.country}
                    svg
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                <Text size="sm" style={{ lineHeight: 1 }}>{`#${player?.countryRank}`}</Text>
              </Group>
            </Group>
          </Group>
        </Group>
        <Group position="right">
          <Button color="red" onClick={onDecline}>
            No
          </Button>
          <Button onClick={onConfirm}>Yes</Button>
        </Group>
      </Group>
    )}
  </Modal>
)
