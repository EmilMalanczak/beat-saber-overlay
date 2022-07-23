import { options as CutVisualizerOptions } from './cut-visualizer'
import { options as HitScoreVisualizerOptions } from './hit-score-visualizer'
import { options as AccuracyPercentage } from './text-options/accuracy-percentage'
import { options as CustomgetTextOptions } from './text-options/custom-text'
import { options as NeonTextOptions } from './text-options/neon-text'

export const options = [
  CustomgetTextOptions,
  CutVisualizerOptions,
  HitScoreVisualizerOptions,
  AccuracyPercentage,
  NeonTextOptions
]
