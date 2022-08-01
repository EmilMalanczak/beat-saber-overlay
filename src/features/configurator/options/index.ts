import { options as CustomgetTextOptions } from './other/custom-text'
import { options as NeonTextOptions } from './other/neon-text'
import { options as PlayerAvatarOptions } from './player/player-avatar'
import { options as PlayerAverageAccOptions } from './player/player-average-acc'
import { options as PlayerCountryRankOptions } from './player/player-country-rank'
import { options as PlayerFlagOptions } from './player/player-flag'
import { options as PlayerNameOptions } from './player/player-name'
import { options as PlayerPPOptions } from './player/player-pp'
import { options as PlayerRankOptions } from './player/player-rank'
import { options as SongAuthorOptions } from './song/song-author'
import { options as SongCoverOptions } from './song/song-cover'
import { options as SongDifficultyBadgeOptions } from './song/song-difficulty-badge'
import { options as SongFullNameOptions } from './song/song-full-name'
import { options as SongHashOptions } from './song/song-hash'
import { options as SongMapperOptions } from './song/song-mapper'
import { options as SongNameOptions } from './song/song-name'
import { options as SongStartDifficultyOptions } from './song/song-star-difficulty'
import { ComponentOptions, ElementsCategory } from './types/options'
import { options as AccuracyPercentage } from './visualizers/accuracy-percentage'
import { options as CutVisualizerOptions } from './visualizers/cut-visualizer'
import { options as HealthAmountOptions } from './visualizers/health-amount'
import { options as HealthBarOptions } from './visualizers/health-bar'
import { options as HitScoreVisualizerOptions } from './visualizers/hit-score-visualizer'
import { options as PlayerScoreOptions } from './visualizers/player-score'

export const options = [
  CustomgetTextOptions,
  CutVisualizerOptions,
  HitScoreVisualizerOptions,
  AccuracyPercentage,
  NeonTextOptions,
  HealthBarOptions,
  HealthAmountOptions,
  PlayerScoreOptions,
  SongAuthorOptions,
  SongHashOptions,
  PlayerAvatarOptions,
  PlayerNameOptions,
  SongMapperOptions,
  SongNameOptions,
  PlayerAverageAccOptions,
  SongDifficultyBadgeOptions,
  SongFullNameOptions,
  PlayerFlagOptions,
  PlayerPPOptions,
  SongStartDifficultyOptions,
  PlayerRankOptions,
  PlayerCountryRankOptions,
  SongCoverOptions
]

export const groupedOptionsByCategory = options.reduce((acc, option) => {
  if (option.category === 'core') {
    return acc
  }

  return {
    ...acc,
    [option.category]: [...(acc[option.category] || []), option]
  }
}, {} as Record<ElementsCategory, ComponentOptions[]>)
