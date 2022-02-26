import { useRouter } from 'next/router'
import { createContext, useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'

import { DEFAULT_IP, HTTPStatus, CONNECTION_RECONNECT_TIME } from '../constants'
import { useStatusStore } from '../store/status'
import { useInterval } from '../hooks/useInterval'
import { useScoreStore } from '../store/score'
import { useSongStore } from '../store/song'
import { SocketEvent } from '../types/SocketEvent'
import { HTTPEventData } from '../types/Events'
import { transformCoordinatesToRadians } from '../utils/transformCoordinatesToRadians'
import { Saber } from '../types/Saber'
import { useUIStore } from '../store/ui'
import { transformRadiansToAngle } from '../utils/transformRadiansToAngle'

export const SocketContext = createContext<WebSocket | null>(null)

const HTTPProvider = SocketContext.Provider

export const SocketProvider: FC = ({ children }) => {
  const router = useRouter()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const { connect, disconnect, connected } = useStatusStore()
  const { getSong } = useSongStore()
  const cutNote = useScoreStore((state) => state.cutNote)
  const resetStore = useScoreStore((state) => state.resetStore)
  const { setSaberColors, colors } = useUIStore()

  const handleConnectToHTTP = useCallback(() => {
    const HTTPSocket = new WebSocket(
      `ws://${router.query.ip ?? DEFAULT_IP}:${HTTPStatus.port}${HTTPStatus.entry}`
    )

    setSocket(HTTPSocket)
  }, [router.query.ip])

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
    [colors, cutNote, getSong, resetStore, setSaberColors]
  )

  useEffect(() => {
    handleConnectToHTTP()
  }, [handleConnectToHTTP])

  useEffect(() => {
    if (!socket) return

    socket.onopen = () => {
      connect()
    }

    socket.onclose = () => {
      disconnect()
      setSocket(null)
    }

    socket.onmessage = (data) => {
      handleTransformSocketData(data)
    }

    // eslint-disable-next-line consistent-return
    return () => {
      socket.close()
    }
  }, [connect, disconnect, handleTransformSocketData, socket])

  useInterval(() => {
    if (!connected) {
      handleConnectToHTTP()
    }
  }, CONNECTION_RECONNECT_TIME)

  return <HTTPProvider value={socket}>{children}</HTTPProvider>
}
