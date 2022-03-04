import type { HitScoreConfig } from '../components/HitScoreVisualizer/HitScore/HitScore'

export const getScoreQualityStyles = (score: number, config: HitScoreConfig) => {
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
