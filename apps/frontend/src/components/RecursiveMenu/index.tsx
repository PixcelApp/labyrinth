import { FC, ReactNode } from 'react'
import {
  RecursiveMenuItem,
  ToolbarMenuItemProps,
} from 'src/components/RecursiveMenu/RecursiveMenuItem'
import { Menu } from '@chakra-ui/menu'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import {
  MenuList,
  PlacementWithLogical,
  UseDisclosureReturn,
} from '@chakra-ui/react'

export interface ToolbarMenuProps {
  trigger: (disclosure: UseDisclosureReturn) => ReactNode
  submenu: Array<ToolbarMenuItemProps>
  /**
   * Default = "bottom"
   */
  placement?: PlacementWithLogical
}

export const RecursiveMenu: FC<ToolbarMenuProps> = ({
  submenu,
  trigger,
  placement = 'bottom',
}) => {
  const disclosure = useDisclosure()
  return (
    <Menu {...disclosure} placement={placement} gutter={4}>
      {trigger(disclosure)}
      <MenuList mt={placement.includes('bottom') ? 0 : '-2px'}>
        {submenu.map((itemProps, i) => (
          <RecursiveMenuItem key={i} {...itemProps} />
        ))}
      </MenuList>
    </Menu>
  )
}
