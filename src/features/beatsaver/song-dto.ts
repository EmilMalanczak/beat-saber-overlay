import { Song, SongDto } from 'features/beatsaver/types/song'

export const transferSongDto = ({ metadata, versions }: Song): SongDto => ({
  author: metadata.songAuthorName,
  mapper: metadata.levelAuthorName,
  cover: versions[versions.length - 1].coverURL,
  difficulty: versions[versions.length - 1].diffs.reduce(
    (acc, { difficulty, stars, maxScore, seconds }) => ({
      ...acc,
      [difficulty]: {
        stars,
        maxScore,
        seconds
      }
    }),
    {}
  )
})
