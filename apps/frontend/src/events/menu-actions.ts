import { MenuActionHandler } from 'src/modules/MenuActionHandler'
import { MenuActions } from 'src/menus/actions'
import {
  actions as tabsActions,
  newProjectTab,
  settingsTab,
  TabType,
} from 'src/state/slice/tabs.slice'
import { batch } from 'react-redux'
import { actions as projectsActions } from 'src/state/slice/projects.slice'
import { window as TauriWindow } from '@tauri-apps/api'
import { store } from 'src/state'
import { navigate } from 'src/utils/navigate'

MenuActionHandler.on(
  MenuActions.MenuBar.Edit.DeveloperOptions.FillRecentProjects.Click,
  () => {
    store.dispatch(
      projectsActions.setRecents([
        {
          project: {
            name: 'Test Project',
            slug: 'test-project',
            settings: {},
          },
          lastOpened: Date.now(),
          screenshotUrl: 'https://picsum.photos/256/192?1',
        },
        {
          project: {
            name: 'Test Project 2',
            slug: 'test-project-2',
            settings: {},
          },
          lastOpened: Date.now(),
          screenshotUrl: 'https://picsum.photos/256/192?2',
        },
        {
          project: {
            name: 'Test Project 3',
            slug: 'test-project-3',
            settings: {},
          },
          lastOpened: Date.now(),
          screenshotUrl: 'https://picsum.photos/256/192?3',
        },
      ]),
    )
  },
)

MenuActionHandler.on(MenuActions.MenuBar.File.NewProject.Click, () => {
  const {
    tabs: { tabs },
  } = store.getState()

  navigate('/projects/new')

  if (tabs.includes(newProjectTab)) return

  store.dispatch(tabsActions.add(newProjectTab))
})

MenuActionHandler.on(MenuActions.MenuBar.File.Preferences.Click, () => {
  const {
    tabs: { tabs },
  } = store.getState()

  navigate('/settings')

  if (tabs.includes(settingsTab)) return

  store.dispatch(tabsActions.add(settingsTab))
})

MenuActionHandler.on(MenuActions.MenuBar.File.Quit.Click, () =>
  TauriWindow.appWindow.close(),
)

MenuActionHandler.on(MenuActions.MenuBar.File.Close.Click, () => {
  const tabs = store.getState().tabs.tabs
  const active = tabs.find((e) => location.pathname.endsWith(e.path))

  if (!active) {
    return
  }

  if (tabs.length === 1) {
    navigate('/')
    store.dispatch(tabsActions.clearAll())
    return
  }

  store.dispatch(tabsActions.remove(active.id))
})

MenuActionHandler.on(MenuActions.MenuBar.File.CloseAll.Click, () => {
  navigate('/')
  store.dispatch(tabsActions.clearAll())
})
