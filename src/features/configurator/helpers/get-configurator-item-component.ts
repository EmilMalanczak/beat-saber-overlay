import { options } from '../options'

export const getConfiguratorItemComponent = (name: string) =>
  options.find((opt) => opt.name === name)?.component
