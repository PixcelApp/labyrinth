import { config } from 'src/theme/config'

export const getCssVar = (key: string) =>
  `var(--${config.cssVarPrefix}-${key.replace(/\.+/g, '-')})`

export const getColorCssVar = (key: string) => getCssVar(`colors.${key}`)
