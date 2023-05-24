import { ThemeOverride } from '@chakra-ui/react'
import { FontFamily } from 'src/theme/fonts'

export const styles = {
  global: {
    html: {
      bg: 'darkest',
      h: 'full',
      minH: 'full',
      imageRendering: 'pixelated',
      cursor: 'url("/icons/cursor/default.png") 0 0, auto',
    },
    body: {
      bg: 'transparent',
      h: 'full',
      minH: 'full',
      color: 'white',
      fontFamily: FontFamily.Body,
    },
    '#root': {
      h: 'full',
      minH: 'full',
    },
  },
} satisfies ThemeOverride['styles']
