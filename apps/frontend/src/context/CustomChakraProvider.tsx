import {
  ColorScheme,
  DEFAULT_COLOR_SCHEME,
  defaultColorScheme,
  getTheme,
} from 'src/theme'
import { LocalStorageItem, useLocalStorage } from 'src/hooks/useLocalStorage'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'

export const ColorSchemeContext = createContext<ColorScheme>(defaultColorScheme)

export const CustomChakraProvider: FC<PropsWithChildren> = ({ children }) => {
  const [colors, setColors] = useState<ColorScheme>(defaultColorScheme)
  const { get: getThemeName } = useLocalStorage(
    LocalStorageItem.AppColorScheme,
    DEFAULT_COLOR_SCHEME,
  )
  const { get: getCustomThemeColors } = useLocalStorage<Partial<ColorScheme>>(
    LocalStorageItem.AppCustomColorScheme,
    {},
    {
      useJSON: true,
    },
  )

  useEffect(() => {
    import(
      /* @vite-ignore */ `../../public/themes/${getThemeName()}/colors.json`
    )
      .then((mod) => mod.default)
      .then((colors) => {
        setColors({ ...colors, ...getCustomThemeColors() })
      })
  }, [])

  return (
    <ChakraProvider theme={getTheme(colors)}>
      <ColorSchemeContext.Provider value={colors}>
        {children}
      </ColorSchemeContext.Provider>
    </ChakraProvider>
  )
}
