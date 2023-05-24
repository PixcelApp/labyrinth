import { FC, useMemo } from 'react'
import menuBarMenuData from 'src/menus/menu-bar.menu'
import { RecursiveMenu } from 'src/components/RecursiveMenu'
import { Button, HStack, MenuButton } from '@chakra-ui/react'
import { UnderlinableText } from 'src/components/UnderlinableText'
import { MenuActionHandler } from 'src/modules/MenuActionHandler'
import { MenuItemType } from 'src/menus/menu-types'
import { MenuActions } from 'src/menus/actions'
import { RecentProject } from 'src/state/slice/projects.slice'
import { useProjects } from 'src/hooks/store.hooks'

export interface MenuBarProps {}

const addRecentsToMenuData = (
  recents: RecentProject[],
  menuData: typeof menuBarMenuData,
) => {
  for (const index in menuData) {
    const data = menuData[index]
    if (data.id === 'file') {
      for (const subIndex in data.submenu) {
        const subIndexData = data.submenu[subIndex]
        if (
          subIndexData.type === 'item-with-submenu' &&
          subIndexData.id === 'open-recent'
        ) {
          const data = menuData[index].submenu[subIndex]

          if (data.type !== 'item-with-submenu') {
            return menuData
          }

          data.submenu = recents.map((recent, id) => ({
            id: `recent_${id}`,
            type: MenuItemType.Item,
            label: recent.project.name,
            disabled: false,
            actions: {
              click: MenuActions.MenuBar.File.OpenRecent.Click,
              hover: MenuActions.MenuBar.File.OpenRecent.Hover,
            },
          }))

          menuData[index].submenu[subIndex] = data

          return menuData
        }
      }
    }
  }

  return menuData
}

export const MenuBar: FC<MenuBarProps> = ({}) => {
  const { recents } = useProjects()

  const buttons = useMemo(
    () =>
      addRecentsToMenuData(recents, menuBarMenuData).map((item, i) => {
        const handleOnClick = (onOpen: () => void) => () => {
          onOpen()
          MenuActionHandler.emit(item.actions.click)
        }

        const handleOnHover = () => {
          MenuActionHandler.emit(item.actions.hover)
        }

        return (
          <RecursiveMenu
            key={i}
            placement="bottom-start"
            trigger={({ onOpen }) => (
              <MenuButton
                as={Button}
                py={2}
                px={2.5}
                variant="text-only"
                onClick={handleOnClick(onOpen)}
                onPointerEnter={handleOnHover}
              >
                <UnderlinableText
                  label={item.label}
                  underlines={item.underlines}
                />
              </MenuButton>
            )}
            submenu={item.submenu}
          />
        )
      }),
    [recents],
  )

  return (
    <HStack w="full" spacing={0}>
      {buttons}
    </HStack>
  )
}
