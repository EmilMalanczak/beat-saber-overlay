import { TextCore, TextCoreProps } from 'features/configurator/elements/text-elements/text-core'

export type CustomTextProps = TextCoreProps & {
  children: string
}

export const CustomText = ({ children = 'Text', ...props }: CustomTextProps) => (
  <TextCore {...props}>{children || 'Text'}</TextCore>
)
