import { Image, ImageProps } from '@mantine/core'

export type ImageCoreProps = Omit<ImageProps, 'width' | 'height'> & { size: number }

export const ImageCore = ({ size, ...props }: ImageCoreProps) => (
  <Image width={size} height={size} {...props} />
)
