import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

import type { FC } from 'react'
import type { Socket } from 'socket.io-client'

import { DEFAULT_IP, HTTPStatus } from '../constants'

export const SocketIOContext = createContext<Socket | null>(null)

const SocketProvider = SocketIOContext.Provider

export const SocketIOProvider: FC = ({ children }) => {
  const router = useRouter()
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(
      `ws://${router.query.ip ?? DEFAULT_IP}:${HTTPStatus.port}${HTTPStatus.entry}`
    )

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [router.query.ip])

  return <SocketProvider value={socket}>{children}</SocketProvider>
}
