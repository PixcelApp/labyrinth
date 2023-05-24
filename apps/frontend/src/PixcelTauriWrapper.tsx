import { FC, PropsWithChildren, useMemo } from 'react'
import { VStack } from '@chakra-ui/react'
import { AppBar } from 'src/components/AppBar'
import { isTauri, isTestingTauriWrapper } from 'src/utils/tauri'

export interface PixcelTauriWrapperProps extends PropsWithChildren {}

export const PixcelTauriWrapper: FC<PixcelTauriWrapperProps> = ({ children }) =>
  useMemo(
    () =>
      isTauri() || isTestingTauriWrapper() ? (
        <VStack boxSize="full" spacing={0}>
          <AppBar />
          {children}
        </VStack>
      ) : (
        <>{children}</>
      ),
    [],
  )
