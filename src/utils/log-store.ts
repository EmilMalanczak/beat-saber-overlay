import { StateCreator, State } from 'zustand'

// Log every time state is changed
// eslint-disable-next-line operator-linebreak
export const logStore =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
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
