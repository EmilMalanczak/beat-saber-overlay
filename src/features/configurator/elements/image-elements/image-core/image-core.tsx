import { Image, ImageProps } from '@mantine/core'

export type ImageCoreProps = Omit<ImageProps, 'width' | 'height'> & {
  width?: number
  height?: number
  size?: number
  rotation: number
}

export const ImageCore = ({ size, width, height, rotation, style, ...props }: ImageCoreProps) => (
  <Image
    width={width || size}
    height={height || size}
    style={{
      transform: `rotate(${rotation}deg)`,
      ...style
    }}
    {...props}
  />
)
