// https://docs.scoresaber.com/

export type Player = {
  id: string
  name: string
  profilePicture: string
  country: string
  pp: number
  rank: number
  countryRank: number
  role: string
  badges: {
    description: string
    image: string
  }[]
  histories: string
  scoreStats: {
    totalScore: number
    totalRankedScore: number
    averageRankedAccuracy: number
    totalPlayCount: number
    rankedPlayCount: number
    replaysWatched: number
  }
  permissions: number
  banned: true
  inactive: true
}

export type PlayerDto = Pick<
  Player,
  'id' | 'name' | 'profilePicture' | 'country' | 'pp' | 'rank' | 'countryRank'
> & {
  averageAcc: Player['scoreStats']['averageRankedAccuracy']
}
