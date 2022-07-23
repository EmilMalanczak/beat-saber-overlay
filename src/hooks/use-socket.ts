import { useContext } from 'react'

import { SocketContext } from 'features/socket/socket-context'

export const useSocket = () => useContext(SocketContext)
