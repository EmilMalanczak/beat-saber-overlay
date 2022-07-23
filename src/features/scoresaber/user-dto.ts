import { Player, PlayerDto } from 'features/scoresaber/types/player'

export const transformUserDto = ({
  id,
  name,
  profilePicture,
  pp,
  rank,
  country,
  countryRank,
  scoreStats
}: Player): PlayerDto => ({
  id,
  name,
  profilePicture,
  country,
  pp,
  rank,
  countryRank,
  averageAcc: scoreStats.averageRankedAccuracy
})
