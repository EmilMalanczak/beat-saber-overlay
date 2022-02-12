import { useRouter } from 'next/router'
import { createContext, useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'

import { DEFAULT_IP, HTTPStatus, CONNECTION_RECONNECT_TIME } from '../constants'
import { useStatusStore } from '../store/status'
import { useInterval } from '../hooks/useInterval'
import { usePlayerStore } from '../store/player'
import { useSongStore } from '../store/song'
import { SocketEvent } from '../types/SocketEvent'
import { HTTPEventData } from '../types/Events'

export const SocketIOContext = createContext<WebSocket | null>(null)

const SocketProvider = SocketIOContext.Provider

export const SocketIOProvider: FC = ({ children }) => {
  const router = useRouter()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const { connect, disconnect, connected } = useStatusStore()
  // const { getPlayerInfo } = usePlayerStore()
  const { getSong } = useSongStore()

  const handleConnectToHTTP = useCallback(() => {
    const HTTPSocket = new WebSocket(
      `ws://${router.query.ip ?? DEFAULT_IP}:${HTTPStatus.port}${HTTPStatus.entry}`
    )

    setSocket(HTTPSocket)
  }, [router.query.ip])

  const handleTransformSocketData = (socketData: any) => {
    const data: HTTPEventData = JSON.parse(socketData.data)
    console.log(data)

    const { event } = data

    switch (event) {
      case SocketEvent.HELLO:
        console.log('%cConnected to HTTPStatus Plugin', 'background-color: green')
        console.log(
          `%cBeat Saber ${data.status.game.gameVersion} | HTTPStatus ${data.status.game.pluginVersion}`
        )

        break

      case SocketEvent.SONG_START:
        const { songHash } = data.status.beatmap!
        getSong(songHash)

        break

      case SocketEvent.NOTE_FULLY_CUT:
        const { noteCut } = data

        console.log(noteCut)

        break

      default:
        break
    }
  }

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
  }, [connect, disconnect, socket])

  useInterval(() => {
    if (!connected) {
      handleConnectToHTTP()
    }
  }, CONNECTION_RECONNECT_TIME)

  return <SocketProvider value={socket}>{children}</SocketProvider>
}
