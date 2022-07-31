import { OptionsType, Option } from '../options/types/options'

export const getConfiguratorItemProps = (options: OptionsType[]) =>
  options.reduce((acc, item) => {
    if (item?.inputTypeName === Option.TOGGLE_COMPONENTS) {
      return {
        ...acc,
        ...item.options.reduce(
          (nAcc, nItem) => ({
            ...nAcc,
            [nItem.propName]: nItem.value
          }),
          {}
        )
      }
    }

    return {
      ...acc,
      [item.propName]: item.value
    }
  }, {})
