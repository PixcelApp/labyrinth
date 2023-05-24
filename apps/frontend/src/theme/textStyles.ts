import { ThemeOverride } from '@chakra-ui/react'
import { FontFamily, FontSize, FontWeight } from 'src/theme/fonts'

export const textStyles = {
  button: {
    fontSize: FontSize.Regular,
    fontFamily: FontFamily.Body,
    fontWeight: FontWeight.Regular,
  },
} satisfies ThemeOverride['textStyles']
