import type { FC } from 'react'
import { Box, HStack, VStack } from '@chakra-ui/react'

import { MenuBar } from 'src/components/MenuBar'
import { PixcelRouter } from 'src/context/PixcelRouter'
import { ProjectTabs } from 'src/components/ProjectTabs'
import { getColorCssVar } from 'src/utils/theme'

export const App: FC = () => {
  return (
    <VStack boxSize="full" spacing={0}>
      <VStack
        w="full"
        spacing={0}
        bg="darkest"
        shadow={`0 -2px 0 0 ${getColorCssVar('black')} inset`}
      >
        <MenuBar />
        <ProjectTabs />
      </VStack>
      <HStack boxSize="full" spacing={2} bg="darker">
        <Box boxSize="full" bg="black">
          <PixcelRouter />
        </Box>
      </HStack>
    </VStack>
  )
}
