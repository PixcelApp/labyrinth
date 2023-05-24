import { baseTheme, extendTheme } from '@chakra-ui/react'
import { config } from 'src/theme/config'
import { styles } from 'src/theme/styles'
import { space } from 'src/theme/space'
import { sizes } from 'src/theme/sizes'
import { fonts } from 'src/theme/fonts'
import { textStyles } from 'src/theme/textStyles'
import { borders } from 'src/theme/borders'
import { components } from 'src/theme/components'
import { shadows } from 'src/theme/shadows'
import { layerStyles } from 'src/theme/layerStyles'

import defaultColorScheme from 'public/themes/dark/colors.json'

export type ColorScheme = typeof defaultColorScheme

export const DEFAULT_COLOR_SCHEME = 'dark'

export { defaultColorScheme }

export const getTheme = (colors: ColorScheme) =>
  ({
    colors,
    config,
    styles,
    space,
    sizes,
    fonts,
    textStyles,
    borders,
    components,
    shadows,
    layerStyles,
    zIndices: baseTheme.zIndices,
  } as const)

export const theme = getTheme(defaultColorScheme)
