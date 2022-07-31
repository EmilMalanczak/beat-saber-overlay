import type { NextApiRequest, NextApiResponse } from 'next'

import { scoresaber } from 'features/scoresaber/scoresaber'
import { Player } from 'features/scoresaber/types/player'
import { transformUserDto } from 'features/scoresaber/user-dto'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { data: scoresaberPlayer } = await scoresaber.get<Player>(`/player/${id}/full`)
  console.log(scoresaberPlayer)

  res.status(200).json(transformUserDto(scoresaberPlayer))
}
