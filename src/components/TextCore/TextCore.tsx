import type { FC, CSSProperties } from 'react'
import classes from './TextCore.module.scss'

export type TextCoreProps = {
  size: number
  weight: number
  font: string
}

export const TextCore: FC<TextCoreProps> = ({ size, children, weight, font }) => (
  <p
    className={classes.text}
    style={
      {
        '--font-size': `${size}px`,
        '--font-weight': weight,
        '--font-family': font
      } as CSSProperties
    }
  >
    {children}
  </p>
)
