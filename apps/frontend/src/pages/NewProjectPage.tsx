import { FC, useState } from 'react'
import { Button, Input, Text, VStack } from '@chakra-ui/react'
import {
  actions as tabsActions,
  newProjectTab,
  TabType,
} from 'src/state/slice/tabs.slice'
import { batch, useDispatch } from 'react-redux'
import { actions as projectsActions } from 'src/state/slice/projects.slice'
import { slugify } from 'src/utils/text'
import { navigate } from 'src/utils/navigate'

const NewProjectPage: FC = ({}) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string | undefined>(undefined)

  const defaultName = 'Untitled Project'

  const createProject = (name: string) => {
    const slug = slugify(name)

    batch(() => {
      dispatch(tabsActions.remove(newProjectTab.id))

      const { payload: project } = dispatch(
        projectsActions.addProject({
          name,
          slug,
          settings: {},
        }),
      )

      dispatch(
        projectsActions.addRecent({
          project,
          lastOpened: Date.now(),
          screenshotUrl: '',
        }),
      )

      dispatch(
        tabsActions.add({
          id: project.slug,
          slug: project.slug,
          type: TabType.Project,
          label: project.name,
          path: `/project/${project.slug}`,
        }),
      )

      navigate(`/project/${project.slug}`)
    })
  }

  return (
    <VStack boxSize="full" spacing={0} bg="darker">
      <VStack w="400px" m={4} p={4} spacing={4}>
        <Text>New Project</Text>
        <VStack>
          <Text>Name</Text>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={defaultName}
          />
        </VStack>
        <Button
          onClick={() => createProject(value ?? defaultName)}
          py={2}
          px={4}
        >
          Create
        </Button>
      </VStack>
    </VStack>
  )
}

export default NewProjectPage
