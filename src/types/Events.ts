/* eslint-disable max-len */
// https://github.com/opl-/beatsaber-http-status/blob/master/protocol.md#status-object

import { SocketEvent } from './SocketEvent'

export type NoteCutObject = {
  noteID: number // ID of the note
  noteType: 'NoteA' | 'NoteB' | 'Bomb' // Type of note
  noteCutDirection:
    | 'Up'
    | 'Down'
    | 'Left'
    | 'Right'
    | 'UpLeft'
    | 'UpRight'
    | 'DownLeft'
    | 'DownRight'
    | 'Any'
    | 'None' // Direction the note is supposed to be cut in
  noteLine: 0 | 1 | 2 | 3 // The horizontal position of the note, from left to right [0..3]
  noteLayer: 0 | 1 | 2 // The vertical position of the note, from bottom to top [0..2]
  speedOK: boolean // Cut speed was fast enough
  directionOK: null | boolean // Note was cut in the correct direction. null for bombs.
  saberTypeOK: null | boolean // Note was cut with the correct saber. null for bombs.
  wasCutTooSoon: boolean // Note was cut too early
  initialScore: null | number // Score without multipliers for the cut. It contains the prehit swing score and the cutDistanceScore, but doesn't include the score for swinging after cut. [0..85] null for bombs.
  finalScore: null | number // Score without multipliers for the entire cut, including score for swinging after cut. [0..115] Available in [`noteFullyCut` event](#notefullycut-event). null for bombs.
  cutDistanceScore: null | number // Score for how close the cut plane was to the note center. [0..15]
  multiplier: number // Combo multiplier at the time of cut
  saberSpeed: number // Speed of the saber when the note was cut
  saberDir: [
    // Direction in note space that the saber was moving in on the collision frame, calculated by subtracting the position of the saber's tip on the previous frame from its current position (current - previous).
    number, // X value
    number, // Y value
    number // Z value
  ]
  saberType: 'SaberA' | 'SaberB' // Saber used to cut this note
  swingRating: number // Game's swing rating. Uses the before cut rating in noteCut events and after cut rating for noteFullyCut events. -1 for bombs.
  timeDeviation: number // Time offset in seconds from the perfect time to cut the note
  cutDirectionDeviation: number // Offset from the perfect cut angle in degrees
  cutPoint: [
    // Position in note space of the point on the cut plane closests to the note center
    number, // X value
    number, // Y value
    number // Z value
  ]
  cutNormal: [
    // Normalized vector describing the normal of the cut plane in note space. Points towards negative X on a correct cut of a directional note.
    number, // X value
    number, // Y value
    number // Z value
  ]
  cutDistanceToCenter: number // Distance from the center of the note to the cut plane
  timeToNextBasicNote: number // Time until next note in seconds
}

export type GameObject = {
  pluginVersion: string // Currently running version of the plugin
  gameVersion: string // Version of the game the current plugin version is targetting
  scene: 'Menu' | 'Song' | 'Spectator' // Indicates player's current activity
  mode:
    | null
    | 'Solo<beatmap.characteristic>'
    | 'Party<beatmap.characteristic>'
    | 'Multiplayer<beatmap.characteristic>' // Composed of game mode and map characteristic. The value is composed for backwards compability. For characteristic, use `beatmap.characteristic` instead. For game mode, compare beginning of string to a constant, or get a substring using length of `beatmap.characteristic`.
}

export type PlayerSettingsObject = {
  staticLights: boolean // `true` if `environmentEffects` is not `AllEffects`. (formerly "Static lights", backwards compat)
  leftHanded: boolean // Left handed
  playerHeight: number // Player's height
  sfxVolume: number // Disable sound effects [0..1]
  reduceDebris: boolean // Reduce debris
  noHUD: boolean // No text and HUDs
  advancedHUD: boolean // Advanced HUD
  autoRestart: boolean // Auto Restart on Fail
  saberTrailIntensity: number // Trail Intensity [0..1]
  environmentEffects: 'AllEffects' | 'StrobeFilter' | 'NoEffects' // Environment effects
  hideNoteSpawningEffect: boolean // Hide note spawning effect
}

export type ModObject = {
  multiplier: number // Current score multiplier for gameplay modifiers
  obstacles: false | 'FullHeightOnly' | 'All' // No Walls (FullHeightOnly is not possible from UI, formerly "No Obstacles")
  instaFail: boolean // 1 Life (formerly "Insta Fail")
  noFail: boolean // No Fail
  batteryEnergy: boolean // 4 Lives (formerly "Battery Energy")
  batteryLives: null | number // Amount of battery energy available. 4 with Battery Energy, 1 with Insta Fail, null with neither enabled.
  disappearingArrows: boolean // Disappearing Arrows
  noBombs: boolean // No Bombs
  songSpeed: 'Normal' | 'Slower' | 'Faster' | 'SuperFast' // Song Speed (Slower = 85%, Faster = 120%, SuperFast = 150%)
  songSpeedMultiplier: number // Song speed multiplier. Might be altered by practice settings.
  noArrows: boolean // No Arrows
  ghostNotes: boolean // Ghost Notes
  failOnSaberClash: boolean // Fail on Saber Clash (Hidden)
  strictAngles: boolean // Strict Angles (Requires more precise cut direction; changes max deviation from 60deg to 15deg)
  fastNotes: boolean // Does something (Hidden)
  smallNotes: boolean // Small Notes
  proMode: boolean // Pro Mode
  zenMode: boolean // Zen Mode
}

export type BeatmapObject = {
  songName: string // Song name
  songSubName: string // Song sub name
  songAuthorName: string // Song author name
  levelAuthorName: string // Beatmap author name
  songCover: null | string // Base64 encoded PNG image of the song cover
  songHash: string // Unique beatmap identifier. Same for all difficulties. Is extracted from the levelId and will return null for OST and WIP songs.
  levelId: string // Raw levelId for a song. Same for all difficulties.
  songBPM: number // Song Beats Per Minute
  noteJumpSpeed: number // Song note jump movement speed, determines how fast the notes move towards the player.
  noteJumpStartBeatOffset: number // Offset in beats for the Half Jump Duration, tweaks how far away notes spawn from the player.
  songTimeOffset: number // Time in milliseconds of where in the song the beatmap starts. Adjusted for song speed multiplier.
  start: null | number // UNIX timestamp in milliseconds of when the map was started. Changes if the game is resumed. Might be altered by practice settings.
  paused: null | number // If game is paused, UNIX timestamp in milliseconds of when the map was paused. null otherwise.
  length: number // Length of map in milliseconds. Adjusted for song speed multiplier.
  difficulty: string // Translated beatmap difficulty name. If SongCore is installed, this may contain a custom difficulty label defined by the beatmap.
  difficultyEnum: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus' // Beatmap difficulty
  characteristic:
    | 'Standard'
    | 'NoArrows'
    | 'OneSaber'
    | '360Degree'
    | '90Degree'
    | 'Lightshow'
    | 'Lawless'
    | string // Characteristic of the set this beatmap belongs to. See https://bsmg.wiki/mapping/map-format.html#beatmapcharacteristicname for a current list of characteristics.
  notesCount: number // Map cube count
  bombsCount: number // Map bomb count. Set even with No Bombs modifier enabled.
  obstaclesCount: number // Map obstacle count. Set even with No Obstacles modifier enabled.
  maxScore: number // Max score obtainable on the map with the current modifier multiplier
  maxRank: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' // Max rank obtainable using current modifiers
  environmentName: string // Name of the environment this beatmap requested. See https://bsmg.wiki/mapping/basic-lighting.html#environment-previews for a current list of environments.
  color: {
    // Contains colors used by this environment. If overrides were set by the player, they replace the values provided by the environment. SongCore may override the colors based on beatmap settings, including player overrides. Each color is stored as an array of three numbers in the range [0..255] representing the red, green, and blue values in order.
    saberA: [number, number, number] // Color of the left saber and its notes
    saberB: [number, number, number] // Color of the right saber and its notes
    environment0: [number, number, number] // First environment color
    environment1: [number, number, number] // Second environment color
    environment0Boost: null | [number, number, number] // First environment boost color. If a boost color isn't set, this property will be `null`, and the value of `environment0` should be used instead.
    environment1Boost: null | [number, number, number] // Second environment boost color. If a boost color isn't set, this property will be `null`, and the value of `environment1` should be used instead.
    obstacle: [number, number, number] // Color of obstacles
  }
}

export type PerformanceObject = {
  rawScore: number // Current score without the modifier multiplier
  score: number // Current score with modifier multiplier
  currentMaxScore: number // Maximum score with modifier multiplier achievable at current passed notes
  rank: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' // Current rank
  passedNotes: number // Amount of hit or missed cubes
  hitNotes: number // Amount of hit cubes
  missedNotes: number // Amount of missed cubes
  passedBombs: number // Amount of hit or missed bombs
  hitBombs: number // Amount of hit bombs
  combo: number // Current combo
  maxCombo: number // Max obtained combo
  multiplier: number // Current combo multiplier {1, 2, 4, 8}
  multiplierProgress: number // Current combo multiplier progress [0..1)
  batteryEnergy: null | number // Current amount of battery lives left. null if Battery Energy and Insta Fail are disabled.
  softFailed: boolean // Set to `true` when the player's energy reaches 0, but they can continue playing. See the `softFailed` event.

  // TODO: check source code - docs are inconsistent
  lastNoteScore: number
}

export type StatusObject = {
  performance: null | PerformanceObject
  game: GameObject
  beatmap: null | BeatmapObject
  playerSettings: PlayerSettingsObject
  mod: ModObject
}

export type EventDataType =
  | {
      event: SocketEvent.HELLO
      status: StatusObject
    }
  | {
      event: SocketEvent.SONG_START
      status: StatusObject
    }
  | {
      event: SocketEvent.FINISHED
      status: Pick<StatusObject, 'performance'>
    }
  | {
      event: SocketEvent.FAILED
      status: Pick<StatusObject, 'performance'>
    }
  | {
      event: SocketEvent.SOFT_FAILED
      status: Pick<StatusObject, 'performance' | 'beatmap' | 'mod'>
    }
  | {
      event: SocketEvent.PAUSE
      status: Pick<StatusObject, 'beatmap'>
    }
  | {
      event: SocketEvent.RESUME
      status: Pick<StatusObject, 'beatmap'>
    }
  | {
      event: SocketEvent.MENU
      status: StatusObject
    }
  | {
      event: SocketEvent.NOTE_SPAWNED
      noteCut: NoteCutObject
    }
  | {
      event: SocketEvent.NOTE_CUT
      status: Pick<StatusObject, 'performance'>
      noteCut: NoteCutObject
    }
  | {
      event: SocketEvent.NOTE_FULLY_CUT
      status: Pick<StatusObject, 'performance'>
      noteCut: NoteCutObject
    }
  | {
      event: SocketEvent.NOTE_MISSED
      status: Pick<StatusObject, 'performance'>
      noteCut: NoteCutObject
    }
  | {
      event: SocketEvent.BOMB_CUT
      status: Pick<StatusObject, 'performance'>
      noteCut: NoteCutObject
    }
  | {
      event: SocketEvent.BOMB_MISSED
      status: Pick<StatusObject, 'performance'>
      noteCut: NoteCutObject
    }
  | {
      event: SocketEvent.OBSTACLE_ENTER
      status: Pick<StatusObject, 'performance'>
    }
  | {
      event: SocketEvent.OBSTACLE_EXIT
      status: Pick<StatusObject, 'performance'>
    }
  | {
      event: SocketEvent.SCORE_CHANGED
      status: Pick<StatusObject, 'performance'>
    }
  | {
      event: SocketEvent.BEATMAP_EVENT
      status: Pick<StatusObject, 'beatmap'>
    }

export type HTTPEventData = EventDataType & {
  time: number
}
