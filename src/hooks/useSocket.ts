import { useContext } from 'react'
import { SocketContext } from '../contexts/Socket'

export const useSocket = () => useContext(SocketContext)
