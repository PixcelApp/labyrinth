import { ThemeOverride } from '@chakra-ui/react'
import { getColorCssVar } from 'src/utils/theme'

export const borders = {
  none: 'none',
  black: `2px solid ${getColorCssVar('black')}`,
} satisfies ThemeOverride['borders']
