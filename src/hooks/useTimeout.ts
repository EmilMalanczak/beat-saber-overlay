import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export const useTimeout = (callback: Function, delay: number | null) => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => savedCallback.current()

    if (typeof delay === 'number') {
      timeoutRef.current = setTimeout(tick, delay)

      return () => clearTimeout(timeoutRef.current as NodeJS.Timeout)
    }
  }, [delay])

  return timeoutRef
}
