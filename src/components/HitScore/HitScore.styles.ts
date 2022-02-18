import { createStyles } from '@mantine/styles'
import { HitScoreConfig } from './HitScore'
import type { HitScoreProps } from './HitScore'

const getScoreQualityStyles = (score: number, config: HitScoreConfig) => {
  const scoreStyles = config.find(({ above }) => above <= score)

  if (scoreStyles) {
    const { color, fontSize, ...rest } = scoreStyles

    return {
      fontSize,
      color,
      ...rest
    }
  }

  return {
    fontSize: 14,
    color: 'white',
    textShadow: 'white 1px 1px 10px'
  }
}

export const useStyles = createStyles(
  (
    _,
    {
      x,
      y,
      score,
      maxRow,
      config
    }: HitScoreProps['note'] & { maxRow: number; config: HitScoreConfig }
  ) => ({
    score: {
      //  css grid columns are counted from 1
      gridColumn: x + 1,
      // grid row is 1 on top
      gridRow: 1 || maxRow - y,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Teko',
      opacity: 1,
      fontWeight: 600,
      ...getScoreQualityStyles(score!, config)
    },
    mounted: {
      // transform: `rotate(${rotate}deg) translate3d(${dx}px, ${dy}px, 0)`,
      opacity: 1
    }
  })
)
