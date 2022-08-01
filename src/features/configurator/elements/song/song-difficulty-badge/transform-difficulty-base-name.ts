import { SongDifficultyEnum } from 'features/beatsaver/types/song'

export const transformDifficultyBaseName = (difficulty: SongDifficultyEnum | null) => {
  switch (difficulty) {
    case SongDifficultyEnum.ExpertPlus:
      return 'Expert+'
    default:
      return difficulty
  }
}
