export enum SongDifficultyEnum {
  Easy = 'Easy',
  Normal = 'Normal',
  Hard = 'Hard',
  Expert = 'Expert',
  ExpertPlus = 'ExpertPlus'
}

type SongMetadata = {
  bpm: number
  duration: number
  levelAuthorName: string
  songAuthorName: string
  songName: string
  songSubName: string
}

type SongDifficulty = {
  bombs: number
  characteristic: string
  chroma: boolean
  cinema: boolean
  difficulty: string
  events: number
  length: number
  me: boolean
  ne: boolean
  njs: unknown
  notes: number
  nps: number
  obstacles: number
  offset: unknown
  paritySummary: {
    errors: number
    resets: number
    warns: number
  }
  seconds: number
  stars: unknown
  maxScore: number
}

type SongVersion = {
  coverURL: string
  createdAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  diffs: SongDifficulty[]
  downloadURL: string
  feedback: string
  hash: string
  key: string
  previewURL: string
  sageScore: unknown
  scheduledAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  state: string
  testplayAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  testplays: [
    {
      createdAt: {
        epochSeconds: number
        nanosecondsOfSecond: number
        value: Date
      }
      feedback: string
      feedbackAt: {
        epochSeconds: number
        nanosecondsOfSecond: number
        value: Date
      }
      user: {
        avatar: string
        curator: boolean
        email: string
        hash: string
        id: number
        name: string
        stats: {
          avgBpm: unknown
          avgDuration: unknown
          avgScore: unknown
          diffStats: {
            easy: number
            expert: number
            expertPlus: number
            hard: number
            normal: number
            total: number
          }
          firstUpload: {
            epochSeconds: number
            nanosecondsOfSecond: number
            value: Date
          }
          lastUpload: {
            epochSeconds: number
            nanosecondsOfSecond: number
            value: Date
          }
          rankedMaps: number
          totalDownvotes: number
          totalMaps: number
          totalUpvotes: number
        }
        testplay: boolean
        type: string
        uniqueSet: boolean
        uploadLimit: number
      }
      video: string
    }
  ]
}

export type Song = {
  automapper: boolean
  createdAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  curatedAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  curator: {
    avatar: string
    curator: boolean
    email: string
    hash: string
    id: number
    name: string
    stats: {
      avgBpm: unknown
      avgDuration: unknown
      avgScore: unknown
      diffStats: {
        easy: number
        expert: number
        expertPlus: number
        hard: number
        normal: number
        total: number
      }
      firstUpload: {
        epochSeconds: number
        nanosecondsOfSecond: number
        value: Date
      }
      lastUpload: {
        epochSeconds: number
        nanosecondsOfSecond: number
        value: Date
      }
      rankedMaps: number
      totalDownvotes: number
      totalMaps: number
      totalUpvotes: number
    }
    testplay: boolean
    type: string
    uniqueSet: boolean
    uploadLimit: number
  }
  deletedAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  description: string
  id: string
  lastPublishedAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  metadata: SongMetadata
  name: string
  qualified: boolean
  ranked: boolean
  stats: {
    downloads: number
    downvotes: number
    plays: number
    score: unknown
    scoreOneDP: unknown
    upvotes: number
  }
  tags: string[]
  updatedAt: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  uploaded: {
    epochSeconds: number
    nanosecondsOfSecond: number
    value: Date
  }
  uploader: {
    avatar: string
    curator: boolean
    email: string
    hash: string
    id: number
    name: string
    stats: {
      avgBpm: unknown
      avgDuration: unknown
      avgScore: unknown
      diffStats: {
        easy: number
        expert: number
        expertPlus: number
        hard: number
        normal: number
        total: number
      }
      firstUpload: {
        epochSeconds: number
        nanosecondsOfSecond: number
        value: Date
      }
      lastUpload: {
        epochSeconds: number
        nanosecondsOfSecond: number
        value: Date
      }
      rankedMaps: number
      totalDownvotes: number
      totalMaps: number
      totalUpvotes: number
    }
    testplay: boolean
    type: string
    uniqueSet: boolean
    uploadLimit: number
  }
  versions: SongVersion[]
}

export type SongDto = {
  author: SongMetadata['songAuthorName']
  mapper: SongMetadata['levelAuthorName']
  cover: SongVersion['coverURL']
  difficulty: Partial<
    Record<
      SongDifficultyEnum,
      {
        stars: SongDifficulty['stars']
        seconds: SongDifficulty['seconds']
      }
    >
  >
}
