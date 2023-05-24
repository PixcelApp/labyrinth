import { Provider as ReduxProvider } from 'react-redux'
import { FC, PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PixcelTauriWrapper } from 'src/PixcelTauriWrapper'
import { SpriteSheetProvider } from 'src/context/SpriteSheetProvider'
import { CustomChakraProvider } from 'src/context/CustomChakraProvider'

import { store } from 'src/state'

export interface PixcelProviderProps extends PropsWithChildren {}

export const PixcelProvider: FC<PixcelProviderProps> = ({ children }) => (
  <ReduxProvider store={store}>
    <SpriteSheetProvider>
      <CustomChakraProvider>
        <PixcelTauriWrapper>
          <BrowserRouter>{children}</BrowserRouter>
        </PixcelTauriWrapper>
      </CustomChakraProvider>
    </SpriteSheetProvider>
  </ReduxProvider>
)
