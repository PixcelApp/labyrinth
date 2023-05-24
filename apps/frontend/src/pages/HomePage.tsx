import React, { FC } from 'react'
import { RecentProjects } from 'src/components/RecentProjects'
import { HStack } from '@chakra-ui/react'

const HomePage: FC = ({}) => {
  return (
    <HStack boxSize="full" p={4} spacing={4} bg="darker" align="start">
      <RecentProjects />
    </HStack>
  )
}

export default HomePage
