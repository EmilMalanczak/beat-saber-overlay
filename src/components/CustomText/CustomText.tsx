import { TextCore, TextCoreProps } from 'components/TextCore'

export type CustomTextProps = TextCoreProps & {
  children: string
}

export const CustomText = ({ children = 'Text', ...props }: CustomTextProps) => (
  <TextCore {...props}>{children || 'Text'}</TextCore>
)
