import { VFC } from 'react'
import { useSpring, animated } from 'react-spring'

import { TextCore, TextCoreProps } from 'features/configurator/elements/text-elements/text-core'
import { useScoreStore } from 'features/socket/store/score'

export const HealthAmount: VFC<TextCoreProps & { animated: boolean }> = ({
  animated: isAnimated,
  ...props
}) => {
  const health = useScoreStore((state) => (typeof state.health === 'number' ? state.health : 0))
  const { amount } = useSpring({ amount: health, immediate: !isAnimated })

  return (
    <TextCore {...props}>
      <animated.span>{amount.to((a) => a.toFixed(0))}</animated.span>
      <span>%</span>
    </TextCore>
  )
}
