import { useContext } from 'react'
import { SocketIOContext } from '../contexts/SocketIO'

export const useSocket = () => useContext(SocketIOContext)
