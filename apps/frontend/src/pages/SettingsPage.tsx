import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SettingOption } from 'src/components/SettingOption'

const SettingsPage: FC = ({}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const goto = (hash: string) => () => navigate({ hash })

  return (
    <HStack boxSize="full" p={4} spacing={4} bg="darker">
      <VStack h="full" w="240px" bg="darkest" layerStyle="panel">
        <SettingOption onClick={goto('general')}>General</SettingOption>
        <SettingOption onClick={goto('tablet')}>Tablet</SettingOption>
        <SettingOption>Files</SettingOption>
        <SettingOption>Color</SettingOption>
        <SettingOption>Alerts</SettingOption>
        <SettingOption>Editor</SettingOption>
        <SettingOption>Selection</SettingOption>
        <SettingOption>Timeline</SettingOption>
        <SettingOption>Cursors</SettingOption>
        <SettingOption>Background</SettingOption>
        <SettingOption>Grid</SettingOption>
        <SettingOption>Guides & Slices</SettingOption>
        <SettingOption>Undo</SettingOption>
        <SettingOption>Theme</SettingOption>
        <SettingOption>Extensions</SettingOption>
        <SettingOption>Experimental</SettingOption>
      </VStack>
      <Box boxSize="full">
        {location.hash === '#general' && (
          <Box boxSize="full">
            <Text>General Settings</Text>
          </Box>
        )}
        {location.hash === '#tablet' && (
          <Box boxSize="full">
            <Text>Tablet Settings</Text>
          </Box>
        )}
      </Box>
    </HStack>
  )
}

export default SettingsPage
