import { useRouter } from 'next/router'
import { createContext, useCallback, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { WebSocketLike } from 'react-use-websocket/dist/lib/types'

import type { FC } from 'react'

import { CONNECTION_RECONNECT_TIME, DEFAULT_IP, HTTPStatus } from 'constants/api'
import { HP_COSTS } from 'constants/score'
import { useCutsStore } from 'store/cuts'
import { useScoreStore } from 'store/score'
import { useSongStore } from 'store/song'
import { useStatusStore } from 'store/status'
import { useUIStore } from 'store/ui'
import { HTTPEventData } from 'types/Events'
import { Saber } from 'types/Saber'
import { SocketEvent } from 'types/SocketEvent'
import { transformCoordinatesToRadians } from 'utils/transformCoordinatesToRadians'
import { transformRadiansToAngle } from 'utils/transformRadiansToAngle'

export const SocketContext = createContext<Pick<
  ReturnType<typeof useWebSocket>,
  'getWebSocket' | 'lastMessage'
> | null>(null)

const HTTPProvider = SocketContext.Provider

export const SocketProvider: FC = ({ children }) => {
  const router = useRouter()
  const { connect, disconnect } = useStatusStore()
  const { getSong } = useSongStore()
  const cutNote = useCutsStore((state) => state.cutNote)
  const resetStore = useCutsStore((state) => state.resetStore)
  const { setSaberColors, colors } = useUIStore()
  const {
    increaseHealth,
    decreaseHealth,
    startObstacleHealthLoss,
    stopObstacleHealthLoss,
    setScore
  } = useScoreStore()

  const { lastMessage, readyState, getWebSocket } = useWebSocket(
    `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${router.query.ip ?? DEFAULT_IP}:${
      HTTPStatus.port
    }${HTTPStatus.entry}`,
    {
      onOpen: connect,
      onClose: disconnect,
      onError: disconnect,
      reconnectInterval: CONNECTION_RECONNECT_TIME
    }
  )
  const handleTransformSocketData = useCallback(
    (socketData) => {
      const data: HTTPEventData = JSON.parse(socketData.data)

      const { event } = data

      switch (event) {
        case SocketEvent.HELLO:
          console.log('%cConnected to HTTPStatus Plugin', 'background-color: green')
          console.log(
            `%cBeat Saber ${data.status.game.gameVersion} | HTTPStatus ${data.status.game.pluginVersion}`
          )

          break

        case SocketEvent.SONG_START:
          const { songHash, color } = data.status.beatmap!
          getSong(songHash)

          setSaberColors({
            [Saber.A]: `rgb(${color.saberA[0]}, ${color.saberA[1]}, ${color.saberA[2]})`,
            [Saber.B]: `rgb(${color.saberB[0]}, ${color.saberB[1]}, ${color.saberB[2]})`
          })
          break

        case SocketEvent.FAILED:
        case SocketEvent.SOFT_FAILED:
        case SocketEvent.MENU:
          resetStore()
          break

        case SocketEvent.OBSTACLE_ENTER:
          startObstacleHealthLoss(data.time)
          break

        case SocketEvent.BOMB_CUT:
          decreaseHealth(HP_COSTS.miss)
          break

        case SocketEvent.NOTE_MISSED:
          decreaseHealth(HP_COSTS[data.noteCut.saberType === null ? 'miss' : 'wrongCut'])
          break

        case SocketEvent.OBSTACLE_EXIT:
          stopObstacleHealthLoss(data.time)
          break
        // TODO need to handle custom mods like insta fail etc.

        case SocketEvent.SCORE_CHANGED:
          const { score, currentMaxScore } = data.status.performance!

          setScore(score, currentMaxScore)
          break

        case SocketEvent.NOTE_FULLY_CUT:
          const {
            noteID,
            finalScore,
            noteLine,
            noteLayer,
            saberDir,
            noteCutDirection,
            cutDirectionDeviation,
            saberTypeOK,
            saberType,
            cutDistanceToCenter
          } = data.noteCut

          console.log(data.noteCut)
          increaseHealth(HP_COSTS.correctCut)
          cutNote({
            id: noteID,
            x: noteLine,
            y: noteLayer,
            score: finalScore,
            radians: transformRadiansToAngle(
              transformCoordinatesToRadians(saberDir[0], saberDir[1])
            ),
            direction: noteCutDirection,
            deviation: cutDirectionDeviation,
            color: colors[saberType],
            badCut: !saberTypeOK,
            fromCenter: cutDistanceToCenter
          })

          break

        default:
          break
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!lastMessage && readyState === ReadyState.OPEN) {
      handleTransformSocketData(lastMessage)
    }
  }, [handleTransformSocketData, lastMessage, readyState])

  return (
    <HTTPProvider
      value={{
        getWebSocket,
        lastMessage
      }}
    >
      {children}
    </HTTPProvider>
  )
}
