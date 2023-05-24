import { FC } from 'react'
import { MainCanvas } from 'src/modules/MainCanvas'
import { useProjects } from 'src/hooks/store.hooks'
import { useParams } from 'react-router-dom'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react'
import { Toolbar } from 'src/components/ToolBar'
import { ColourPicker } from 'src/components/ColourPicker'
import { ColourPalette } from "src/components/ColourPalette";

const ProjectPage: FC = ({}) => {
  const { projects } = useProjects()
  const { slug } = useParams()

  const project = projects.find((project) => project.slug === slug)

  if (!slug || !project) {
    return (
      <Center bg="darker" boxSize="full">
        Oops! I couldn't find that project :(
      </Center>
    )
  }

  return (
    <VStack boxSize="full" spacing={0} bg="darker">
      <HStack boxSize="full" spacing={2}>
        <Toolbar />
        <MainCanvas project={project} />
        <Box h="full" py={2} pr={2} flexShrink={0}>
          <VStack h="full">
            <ColourPicker />
            <ColourPalette />
          </VStack>
        </Box>
      </HStack>
      <Box w="full" px={2} pb={2}>
        <HStack boxSize="full">
          <Text>Something</Text>
        </HStack>
      </Box>
    </VStack>
  )
}

export default ProjectPage
