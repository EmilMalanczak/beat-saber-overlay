import { Player, PlayerDto } from 'types/Player'

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
