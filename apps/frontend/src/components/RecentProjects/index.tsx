import { type FC } from 'react'
import { batch, useDispatch } from 'react-redux'
import { Button, HStack, Image, Text, VStack, Wrap } from '@chakra-ui/react'
import { useProjects, useTabs } from 'src/hooks/store.hooks'
import { CanvasBox } from 'src/components/CanvasBox'
import { useTextureFromUVs } from 'src/hooks/useTextureFromUVs'
import { getSpriteUVs } from 'src/utils/sprites'
import {
  actions as projectActions,
  RecentProject,
} from 'src/state/slice/projects.slice'
import { actions as tabsActions, TabType } from 'src/state/slice/tabs.slice'
import { useNavigate } from 'react-router-dom'

export const RecentProjects: FC = () => {
  const navigate = useNavigate()
  const { tabs } = useTabs()
  const { recents } = useProjects()
  const texture = useTextureFromUVs(getSpriteUVs(15, 51, 45))
  const previewTexture = useTextureFromUVs(getSpriteUVs(15, 51, 15))
  const dispatch = useDispatch()

  const handleRemoveRecent = (recent: RecentProject) => () =>
    dispatch(projectActions.removeRecent(recent))

  const handleOpenRecent = (recent: RecentProject) => () => {
    if (
      tabs.some(
        (tab) =>
          tab.type === TabType.Project && tab.slug === recent.project.slug,
      )
    ) {
      return navigate(`/project/${recent.project.slug}`)
    }

    batch(() => {
      dispatch(projectActions.addProject(recent.project))
      dispatch(
        tabsActions.add({
          slug: recent.project.slug,
          id: recent.project.slug,
          type: TabType.Project,
          label: recent.project.name,
          path: `/project/${recent.project.slug}`,
        }),
      )
      navigate(`/project/${recent.project.slug}`)
    })
  }

  return (
    <CanvasBox p={2} edges={4} texture={texture} boxSize="full">
      <VStack align="start" spacing={2}>
        <Text px={1}>Recent Projects</Text>
        <Wrap spacing={2} px={0.5} w="full">
          {recents.map((recent, i) => (
            <CanvasBox
              key={recent.project.slug}
              onClick={handleOpenRecent(recent)}
              p={2}
              edges={4}
              texture={texture}
            >
              <VStack align="start">
                <CanvasBox
                  shouldOverlay
                  edges={4}
                  texture={previewTexture}
                  width="256px"
                  height="192px"
                >
                  <Image
                    draggable={false}
                    rounded="16px"
                    src={`https://picsum.photos/256/192?${i}`}
                  />
                </CanvasBox>
                <HStack w="full" justify="space-between">
                  <Text color="lighter" noOfLines={1}>
                    {recent.project.name}
                  </Text>
                  <Button
                    onClick={handleRemoveRecent(recent)}
                    variant="close-icon"
                  >
                    x
                  </Button>
                </HStack>
              </VStack>
            </CanvasBox>
          ))}
        </Wrap>
      </VStack>
    </CanvasBox>
  )
}
