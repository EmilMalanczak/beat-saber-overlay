import { VFC } from 'react'
import { useSpring, animated } from 'react-spring'

import { TextCore, TextCoreProps } from 'features/configurator/elements/core/text-core'
import { useScoreStore } from 'features/socket/store/score'

export const PlayerScore: VFC<TextCoreProps & { animated: boolean }> = ({
  animated: isAnimated,
  ...props
}) => {
  const scoreRaw = useScoreStore((state) => state.score)
  const { score } = useSpring({ score: scoreRaw, immediate: !isAnimated })

  return (
    <TextCore {...props}>
      <animated.span>{score.to((a) => a.toFixed(0))}</animated.span>
    </TextCore>
  )
}
