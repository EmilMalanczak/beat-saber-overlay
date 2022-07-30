import { useRef, useEffect, RefObject } from 'react'

export const useEventListener = <
  EventType,
  KW extends keyof WindowEventMap = keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap = keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: KW | KH,
  handler: (
    event: EventType extends unknown
      ? EventType
      : WindowEventMap[KW] | HTMLElementEventMap[KH] | Event
  ) => void,
  options?: AddEventListenerOptions,
  element?: RefObject<T>
): void => {
  const savedHandlerRef = useRef(handler)

  useEffect(() => {
    savedHandlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement: T | Window = element?.current || window

    const isSupported = targetElement?.addEventListener
    if (!isSupported) return

    const eventListener = (event: any): void => {
      savedHandlerRef.current(event)
    }

    targetElement.addEventListener(
      eventName,
      eventListener,
      options ?? {
        capture: false,
        passive: true
      }
    )

    // eslint-disable-next-line consistent-return
    return (): void => targetElement.removeEventListener(eventName, eventListener)
  }, [eventName, element, handler, options])
}
