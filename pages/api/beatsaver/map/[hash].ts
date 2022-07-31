import type { NextApiRequest, NextApiResponse } from 'next'

import { beatsaver } from 'features/beatsaver/beatsaver'
import { transferSongDto } from 'features/beatsaver/song-dto'
import { Song } from 'features/beatsaver/types/song'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { hash } = req.query
  const { data: song } = await beatsaver.get<Song>(`/maps/hash/${hash}`)
  console.log(song)

  res.status(200).json(transferSongDto(song))
}
