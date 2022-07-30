import ReactCountryFlag, { ReactCountryFlagProps } from 'react-country-flag'

import { usePlayerStore } from 'features/scoresaber/player'

export type ImageCoreProps = ReactCountryFlagProps & {
  size: number
  rotation: number
  radius: number
}

export const PlayerFlag = ({ size, rotation, radius }: ImageCoreProps) => {
  const country = usePlayerStore((state) => state.player?.country)

  return (
    country && (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          overflow: 'hidden',
          transform: `rotate(${rotation}deg)`
        }}
      >
        <ReactCountryFlag
          countryCode={country}
          svg
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  )
}
