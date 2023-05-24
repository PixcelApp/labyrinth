import { ThemeOverride } from '@chakra-ui/react'
import { menuTheme } from 'src/theme/components/menu.theme'
import { buttonTheme } from 'src/theme/components/button.theme'
import { tooltipTheme } from 'src/theme/components/tooltip.theme'

export const components = {
  Menu: menuTheme,
  Button: buttonTheme,
  Tooltip: tooltipTheme,
} satisfies ThemeOverride['components']
