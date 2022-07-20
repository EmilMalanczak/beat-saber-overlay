import { lighten, rgba } from 'polished'
import { CSSProperties } from 'react'

import classes from './NeonText.module.scss'

export type NeonTextProps = {
  children: string
  size: number
  intensity: number
  hue: number
}

const textColor = lighten(0.5)

export const NeonText = ({ children = 'Text', hue, size, intensity }: NeonTextProps) => (
  <p
    className={classes.text}
    style={
      {
        '--font-size': `${size}px`,
        '--font-family': 'Neon Tubes',
        '--text-color': textColor(`hsl(${hue}, 100%, 50%)`),
        '--neon-color': rgba(`hsl(${hue}, 100%, 50%)`, intensity / 100)
      } as CSSProperties
    }
  >
    {children || 'Text'}
  </p>
)
