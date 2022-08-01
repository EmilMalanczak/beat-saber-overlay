import type { HitScoreConfig } from 'features/configurator/elements/visualizers/hit-score-visualizer/hit-score/hit-score'

export const getScoreQualityStyles = (score: number, config: HitScoreConfig) => {
  const scoreStyles = config?.find(({ above }) => above <= score)

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
