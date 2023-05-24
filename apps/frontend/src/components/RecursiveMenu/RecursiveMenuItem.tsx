import { FC } from 'react'
import { RecursiveMenu } from 'src/components/RecursiveMenu'
import { UnderlinableText } from 'src/components/UnderlinableText'
import { MenuButton, MenuDivider, MenuItem } from '@chakra-ui/react'
import { MenuItem as MenuItemProps, MenuItemType } from 'src/menus/menu-types'
import { MenuActionHandler } from 'src/modules/MenuActionHandler'
import { useIsProject } from 'src/hooks/store.hooks'

export type ToolbarMenuItemProps = MenuItemProps & {
  onClick?: () => void
  onHover?: () => void
}

export const RecursiveMenuItem: FC<ToolbarMenuItemProps> = (item) => {
  const isProject = useIsProject()

  if (item.type === MenuItemType.Separator) {
    return <MenuDivider />
  }

  const { type, label, underlines, onClick, onHover } = item

  const disabled =
    !isProject && ['save', 'save-as'].includes(item.id) ? true : item.disabled

  const handleOnClick = () => {
    MenuActionHandler.emit(item.actions.click)
    onClick?.()
  }

  const handleOnHover = () => {
    MenuActionHandler.emit(item.actions.hover)
    onHover?.()
  }

  const createOnClickHandler = (onOpen: () => void) => () => {
    if (disabled) {
      return
    }
    handleOnClick()
    onOpen()
  }

  return type === MenuItemType.ItemWithSubmenu ? (
    <RecursiveMenu
      placement="right-start"
      trigger={({ onOpen }) => (
        <MenuItem
          as={MenuButton}
          isDisabled={disabled}
          onClick={createOnClickHandler(onOpen)}
          onPointerEnter={handleOnHover}
        >
          <UnderlinableText label={label} underlines={underlines} />
        </MenuItem>
      )}
      submenu={item.submenu}
    />
  ) : (
    <MenuItem
      isDisabled={disabled}
      onClick={handleOnClick}
      onPointerEnter={handleOnHover}
    >
      <UnderlinableText label={label} underlines={underlines} />
    </MenuItem>
  )
}
