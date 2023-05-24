import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getImageSize } from 'src/utils/getImageSize'
import { LocalStorageItem, useLocalStorage } from 'src/hooks/useLocalStorage'
import { DEFAULT_COLOR_SCHEME } from 'src/theme'

const originalThemeSize = 128

export interface SpriteSheetContextProps {
  name: string
  size: number
  scale: number
}

export const SpriteSheetContext = createContext<SpriteSheetContextProps>({
  name: 'default',
  size: 128, // size of the default theme (128x128px)
  scale: 1,
})

export interface SpriteSheetProviderProps extends PropsWithChildren {}

export const SpriteSheetProvider: FC<SpriteSheetProviderProps> = ({
  children,
}) => {
  const [size, setSize] = useState(128)
  const [scale, setScale] = useState(1)
  const { value: name } = useLocalStorage(
    LocalStorageItem.AppColorScheme,
    DEFAULT_COLOR_SCHEME,
  )

  useEffect(() => {
    getImageSize(`/themes/${name}/sprites.png`).then((size) => {
      setSize(size)
      setScale(size / originalThemeSize)
    })
  }, [])

  return (
    <SpriteSheetContext.Provider value={{ scale, size, name }}>
      {children}
    </SpriteSheetContext.Provider>
  )
}

export const useSpriteSheet = () => useContext(SpriteSheetContext)
