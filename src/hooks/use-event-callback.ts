import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'

type Fn<ARGS extends any[], R> = (...args: ARGS) => R

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const useEventCallback = <A extends any[], R>(fn: Fn<A, R>): Fn<A, R> => {
  const ref = useRef<Fn<A, R>>(fn)

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  })

  return useMemo(
    () =>
      (...args: A): R => {
        const { current } = ref
        return current(...args)
      },
    []
  )
}
