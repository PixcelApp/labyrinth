import { MenuItem, MenuItemType } from 'src/menus/menu-types'
import { isTauri } from 'src/utils/tauri'

export const Actions = {
  File: {
    Click: 'menus:menu-bar:file:click',
    Hover: 'menus:menu-bar:file:hover',
    NewProject: {
      Click: 'menus:menu-bar:file:new-project:click',
      Hover: 'menus:menu-bar:file:new-project:hover',
    },
    Close: {
      Click: 'menus:menu-bar:file:close:click',
      Hover: 'menus:menu-bar:file:close:hover',
    },
    CloseAll: {
      Click: 'menus:menu-bar:file:close-all:click',
      Hover: 'menus:menu-bar:file:close-all:hover',
    },
    Preferences: {
      Click: 'menus:menu-bar:file:preferences:click',
      Hover: 'menus:menu-bar:file:preferences:hover',
    },
    Quit: {
      Click: 'menus:menu-bar:file:quit:click',
      Hover: 'menus:menu-bar:file:quit:hover',
    },
  },
  Edit: {
    Click: 'menus:menu-bar:edit:click',
    Hover: 'menus:menu-bar:edit:hover',
    DeveloperOptions: {
      Click: 'menus:menu-bar:edit:developer-options:click',
      Hover: 'menus:menu-bar:edit:developer-options:hover',
      FillRecentProjects: {
        Click:
          'menus:menu-bar:edit:developer-options:fill-recent-projects:click',
        Hover:
          'menus:menu-bar:edit:developer-options:fill-recent-projects:hover',
      },
    },
    Undo: {
      Click: 'menus:menu-bar:edit:undo:click',
      Hover: 'menus:menu-bar:edit:undo:hover',
    },
    Redo: {
      Click: 'menus:menu-bar:edit:redo:click',
      Hover: 'menus:menu-bar:edit:redo:hover',
    },
    TestSubMenus: {
      Click: 'menus:menu-bar:edit:test-sub-menus:click',
      Hover: 'menus:menu-bar:edit:test-sub-menus:hover',
    },
  },
} as const

const menu_file: MenuItem = {
  id: 'file',
  type: MenuItemType.ItemWithSubmenu,
  disabled: false,
  label: 'File',
  underlines: [[0, 1]],
  alt_key_trigger: 'f',
  submenu: [
    {
      id: 'new-project',
      type: MenuItemType.Item,
      disabled: false,
      label: 'New Project',
      accelerator: 'Ctrl+N',
      alt_key_trigger: 'n',
      underlines: [[0, 1]],
      actions: {
        click: Actions.File.NewProject.Click,
        hover: Actions.File.NewProject.Hover,
      },
    },
    {
      type: MenuItemType.Separator,
    },
    {
      id: 'close',
      type: MenuItemType.Item,
      disabled: false,
      label: 'Close',
      accelerator: 'Ctrl+W',
      alt_key_trigger: 'c',
      underlines: [[0, 1]],
      actions: {
        click: Actions.File.Close.Click,
        hover: Actions.File.Close.Hover,
      },
    },
    {
      id: 'close-all',
      type: MenuItemType.Item,
      disabled: false,
      label: 'Close All',
      accelerator: 'Ctrl+Shift+W',
      actions: {
        click: Actions.File.CloseAll.Click,
        hover: Actions.File.CloseAll.Hover,
      },
    },
    {
      type: MenuItemType.Separator,
    },
    {
      id: 'preferences',
      type: MenuItemType.Item,
      disabled: false,
      label: 'Preferences',
      accelerator: 'Ctrl+P',
      alt_key_trigger: 'p',
      underlines: [[0, 1]],
      actions: {
        click: Actions.File.Preferences.Click,
        hover: Actions.File.Preferences.Hover,
      },
    },
  ],
  actions: {
    click: Actions.File.Click,
    hover: Actions.File.Hover,
  },
}

if (isTauri()) {
  menu_file.submenu.push(
    {
      type: MenuItemType.Separator,
    },
    {
      id: 'quit',
      type: MenuItemType.Item,
      disabled: false,
      label: 'Quit',
      accelerator: 'Ctrl+Q',
      alt_key_trigger: 'q',
      underlines: [[0, 1]],
      actions: {
        click: Actions.File.Quit.Click,
        hover: Actions.File.Quit.Hover,
      },
    },
  )
}

const menu_open: MenuItem = {
  id: 'open',
  type: MenuItemType.ItemWithSubmenu,
  disabled: false,
  label: 'Edit',
  underlines: [[0, 1]],
  alt_key_trigger: 'e',
  submenu: [
    {
      id: 'developer-options',
      type: MenuItemType.ItemWithSubmenu,
      disabled: false,
      label: 'Developer Options',
      actions: {
        click: Actions.Edit.DeveloperOptions.Click,
        hover: Actions.Edit.DeveloperOptions.Hover,
      },
      submenu: [
        {
          id: 'fill-recent-projects',
          type: MenuItemType.Item,
          disabled: false,
          label: 'Fill Recent Projects',
          actions: {
            click: Actions.Edit.DeveloperOptions.FillRecentProjects.Click,
            hover: Actions.Edit.DeveloperOptions.FillRecentProjects.Hover,
          },
        },
      ],
    },
    {
      type: MenuItemType.Separator,
    },
    {
      id: 'undo',
      type: MenuItemType.Item,
      disabled: false,
      label: 'Undo',
      accelerator: 'Ctrl+Z',
      alt_key_trigger: 'u',
      underlines: [[0, 1]],
      actions: {
        click: Actions.Edit.Undo.Click,
        hover: Actions.Edit.Undo.Hover,
      },
    },
    {
      id: 'redo',
      type: MenuItemType.Item,
      disabled: false,
      label: 'Redo',
      accelerator: 'Ctrl+Shift+Z',
      alt_key_trigger: 'r',
      underlines: [[0, 1]],
      actions: {
        click: Actions.Edit.Redo.Click,
        hover: Actions.Edit.Redo.Hover,
      },
    },
    {
      type: MenuItemType.Separator,
    },
    {
      id: 'test-sub-menus',
      type: MenuItemType.ItemWithSubmenu,
      disabled: false,
      label: 'Test Sub Menus',
      actions: {
        click: Actions.Edit.TestSubMenus.Click,
        hover: Actions.Edit.TestSubMenus.Hover,
      },
      submenu: [
        {
          id: 'test-sub-menus',
          type: MenuItemType.ItemWithSubmenu,
          disabled: false,
          label: 'Test Sub Menus',
          actions: {
            click: Actions.Edit.TestSubMenus.Click,
            hover: Actions.Edit.TestSubMenus.Hover,
          },
          submenu: [
            {
              id: 'test-sub-menus',
              type: MenuItemType.ItemWithSubmenu,
              disabled: false,
              label: 'Test Sub Menus',
              actions: {
                click: Actions.Edit.TestSubMenus.Click,
                hover: Actions.Edit.TestSubMenus.Hover,
              },
              submenu: [
                {
                  id: 'test-sub-menus',
                  type: MenuItemType.ItemWithSubmenu,
                  disabled: false,
                  label: 'Test Sub Menus',
                  actions: {
                    click: Actions.Edit.TestSubMenus.Click,
                    hover: Actions.Edit.TestSubMenus.Hover,
                  },
                  submenu: [
                    {
                      id: 'test',
                      type: MenuItemType.Item,
                      disabled: false,
                      label: 'Hi',
                      actions: {
                        click: Actions.Edit.TestSubMenus.Click,
                        hover: Actions.Edit.TestSubMenus.Hover,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  actions: {
    click: Actions.Edit.Click,
    hover: Actions.Edit.Hover,
  },
}

export default [menu_file, menu_open] satisfies MenuItem[]
