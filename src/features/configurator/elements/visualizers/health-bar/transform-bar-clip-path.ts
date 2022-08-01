import { HealthBarProps } from './health-bar'

export const transformBarClipPath = (x: number, direction: HealthBarProps['direction']) => {
  switch (direction) {
    case 'right':
      return `polygon(0% 0%, ${x}% 0%, ${x}% 100%, 0% 100%)`

    case 'left':
      return `polygon(${100 - x}% 0%, 100% 0%, 100% 100%, ${100 - x}% 100%)`

    case 'up':
      return `polygon(0% ${100 - x}%, 100% ${100 - x}%, 100% 100%, 0% 100%)`

    case 'down':
      return `polygon(0% 0%, 100% 0%, 100% ${x}%, 0% ${x}%)`

    default:
      return `polygon(0% 0%, ${x}% 0%, ${x}% 100%, 0% 100%)`
  }
}
