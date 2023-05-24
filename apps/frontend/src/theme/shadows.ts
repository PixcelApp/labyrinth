import { getColorCssVar } from 'src/utils/theme'

export const shadows = {
  shadow: `2px 2px 0 0 ${getColorCssVar('darkest')}`,
  black: `2px 2px 0 0 ${getColorCssVar('black')}`,
} as const
