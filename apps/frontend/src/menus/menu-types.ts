import { MenuActionsActions } from 'src/menus/actions'

export enum MenuItemType {
  Item = 'item',
  ItemWithSubmenu = 'item-with-submenu',
  Separator = 'separator',
}

export interface MenuItemWithoutSubmenu {
  id: string
  type: MenuItemType.Item
  disabled: boolean
  label: string
  underlines?: number[][]
  accelerator?: string
  alt_key_trigger?: string
  actions: {
    click: MenuActionsActions
    hover: MenuActionsActions
  }
}

export interface MenuItemWithSubmenu
  extends Omit<MenuItemWithoutSubmenu, 'type'> {
  type: MenuItemType.ItemWithSubmenu
  submenu: MenuItem[]
}

export interface MenuSeparator {
  type: MenuItemType.Separator
}

export type MenuItem =
  | MenuItemWithoutSubmenu
  | MenuItemWithSubmenu
  | MenuSeparator
