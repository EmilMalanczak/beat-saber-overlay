import { useCallback, useEffect, useRef } from 'react'

export const useThrottle = (callback: (...args: any[]) => void, threshold: number) => {
  const wait = useRef(false)
  const timeout = useRef(-1)

  useEffect(() => () => clearTimeout(timeout.current), [])

  return useCallback(
    (...args) => {
      if (!wait.current) {
        callback(...args)
        wait.current = true
        clearTimeout(timeout.current)

        timeout.current = setTimeout(() => {
          wait.current = false
        }, threshold) as unknown as number
      }
    },
    [callback, threshold]
  )
}
