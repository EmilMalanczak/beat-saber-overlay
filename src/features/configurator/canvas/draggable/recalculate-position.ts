import { getConfiguratorElement } from 'features/configurator/helpers/get-configurator-element'

export function isNum(num: any): boolean {
  return typeof num === 'number' && !Number.isNaN(num)
}

export function int(a: string): number {
  return parseInt(a, 10)
}

export function outerHeight(node: HTMLElement): number {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  let height = node.clientHeight
  const computedStyle = getComputedStyle(node)
  height += int(computedStyle?.borderTopWidth || '0px')
  height += int(computedStyle?.borderBottomWidth || '0px')
  return height
}

export function outerWidth(node: HTMLElement): number {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth
  const computedStyle = getComputedStyle(node)
  width += int(computedStyle?.borderLeftWidth || '0px')
  width += int(computedStyle?.borderRightWidth || '0px')
  return width
}
export function innerHeight(node: HTMLElement): number {
  let height = node.clientHeight
  const computedStyle = getComputedStyle(node)
  height -= int(computedStyle?.paddingTop || '0px')
  height -= int(computedStyle?.paddingBottom || '0px')
  return height
}

export function innerWidth(node: HTMLElement): number {
  let width = node.clientWidth
  const computedStyle = getComputedStyle(node)
  width -= int(computedStyle?.paddingLeft || '0px')
  width -= int(computedStyle?.paddingRight || '0px')
  return width
}

// code copied from react-draggable XD

export const recalculatePosition = (
  id: number | string,
  px: number,
  py: number
): { x: number; y: number } => {
  const node = document.getElementById(`${id}`)
  const canvas = getConfiguratorElement()

  if (!node || !canvas) return { x: 0, y: 0 }

  const nodeStyle = getComputedStyle(node)
  const boundNodeStyle = getComputedStyle(canvas)

  // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
  const bounds = {
    left: -node.offsetLeft + int(boundNodeStyle.paddingLeft) + int(nodeStyle.marginLeft),
    top: -node.offsetTop + int(boundNodeStyle.paddingTop) + int(nodeStyle.marginTop),
    right:
      innerWidth(canvas) -
      outerWidth(node) -
      node.offsetLeft +
      int(boundNodeStyle.paddingRight) -
      int(nodeStyle.marginRight),
    bottom:
      innerHeight(canvas) -
      outerHeight(node) -
      node.offsetTop +
      int(boundNodeStyle.paddingBottom) -
      int(nodeStyle.marginBottom)
  }

  let x = px
  let y = py
  // Keep x and y below right and bottom limits...
  if (isNum(bounds.right)) x = Math.min(x, bounds.right)
  if (isNum(bounds.bottom)) y = Math.min(y, bounds.bottom)

  // But above left and top limits.
  if (isNum(bounds.left)) x = Math.max(x, bounds.left)
  if (isNum(bounds.top)) y = Math.max(y, bounds.top)

  return {
    x,
    y
  }
}
