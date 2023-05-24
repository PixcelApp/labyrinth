import { FC, MouseEvent } from 'react'
import { Button, Center, HStack, Text } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTabs } from 'src/hooks/store.hooks'
import { useDispatch } from 'react-redux'
import { Reorder } from 'framer-motion'
import { Tab, TabType } from 'src/state/slice/tabs.slice'

export interface ProjectTabsProps {}

export const ProjectTabs: FC<ProjectTabsProps> = ({}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tabs, actions } = useTabs()

  const onReorder = (newOrder: Tab[]) => {
    dispatch(actions.reorder(newOrder))
  }

  const handleOnClose = (tab: Tab) => (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const removeTab = () => {
      dispatch(actions.remove(tab.id))
    }

    if ('slug' in tab && !location.pathname.endsWith(tab.slug)) {
      return removeTab()
    }

    const index = tabs.findIndex((t) => t.id === tab.id)
    const previousTab = tabs[index - 1]
    const nextTab = tabs[index + 1]

    removeTab()

    if (previousTab && previousTab.type === TabType.Project) {
      return navigate(previousTab.path)
    }

    if (nextTab && nextTab.type === TabType.Project) {
      return navigate(nextTab.path)
    }

    if (nextTab) {
      return navigate(nextTab.path)
    }

    navigate('/')
  }

  return (
    <HStack
      as={Reorder.Group}
      w="full"
      px={2.5}
      pt={1}
      spacing="-2px"
      axis="x"
      onReorder={onReorder}
      values={tabs}
    >
      {tabs.map((tab) => (
        <Reorder.Item key={tab.id} style={{ listStyle: 'none' }} value={tab}>
          <Link draggable={false} to={tab.path}>
            <Button
              as={HStack}
              spacing={4}
              draggable={false}
              py={2}
              pl={4}
              pr={tabs.length > 1 ? 2 : 4}
              variant="tab"
              isActive={location.pathname === tab.path}
            >
              {'icon' in tab && <>{tab.icon}</>}
              <Text>{tab.label}</Text>
              {tabs.length > 1 && (
                <Center
                  as={Button}
                  variant="close-icon"
                  onClick={handleOnClose(tab)}
                >
                  <Text>x</Text>
                </Center>
              )}
            </Button>
          </Link>
        </Reorder.Item>
      ))}
    </HStack>
  )
}
