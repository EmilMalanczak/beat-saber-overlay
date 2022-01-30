import create from 'zustand'
import produce from 'immer'
import pipe from 'ramda/es/pipe'

import type { State, StateCreator } from 'zustand'
import type { Draft } from 'immer'

// Log every time state is changed
// eslint-disable-next-line operator-linebreak
const log =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config(
      (args) => {
        console.log({ applied: args })
        set(args)
        console.log({ newState: get() })
      },
      get,
      api
    )

// eslint-disable-next-line operator-linebreak
const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce<T>(fn)), get, api)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - according to docs its correct implementation https://docs.pmnd.rs/zustand/recipes#middleware
export const createStore = pipe(log, immer, create)
