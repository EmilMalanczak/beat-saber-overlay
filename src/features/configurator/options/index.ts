import { options as CutVisualizerOptions } from './cut-visualizer'
import { options as HealthBarOptions } from './health-bar'
import { options as HitScoreVisualizerOptions } from './hit-score-visualizer'
import { options as PlayerAvatarOptions } from './image-options/player-avatar'
import { options as PlayerFlagOptions } from './image-options/player-flag'
import { options as SongCoverOptions } from './image-options/song-cover'
import { options as SongDifficultyBadgeOptions } from './song-difficulty-badge'
import { options as AccuracyPercentage } from './text-options/accuracy-percentage'
import { options as CustomgetTextOptions } from './text-options/custom-text'
import { options as HealthAmountOptions } from './text-options/health-amount'
import { options as NeonTextOptions } from './text-options/neon-text'
import { options as PlayerCountryRankOptions } from './text-options/player-country-rank'
import { options as PlayerNameOptions } from './text-options/player-name'
import { options as PlayerPPOptions } from './text-options/player-pp'
import { options as PlayerRankOptions } from './text-options/player-rank'
import { options as PlayerScoreOptions } from './text-options/player-score'
import { options as SongFullNameOptions } from './text-options/song-full-name'
import { options as SongStartDifficultyOptions } from './text-options/song-star-difficulty'

export const options = [
  CustomgetTextOptions,
  CutVisualizerOptions,
  HitScoreVisualizerOptions,
  AccuracyPercentage,
  NeonTextOptions,
  HealthBarOptions,
  HealthAmountOptions,
  PlayerScoreOptions,
  PlayerAvatarOptions,
  PlayerNameOptions,
  SongDifficultyBadgeOptions,
  SongFullNameOptions,
  PlayerFlagOptions,
  PlayerPPOptions,
  SongStartDifficultyOptions,
  PlayerRankOptions,
  PlayerCountryRankOptions,
  SongCoverOptions
]
