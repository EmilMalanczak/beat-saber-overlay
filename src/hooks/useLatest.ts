import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

export const useLatest = <T>(current: T): MutableRefObject<T> => {
  const storedValue = useRef(current)

  useEffect(() => {
    storedValue.current = current
  })

  return storedValue
}
