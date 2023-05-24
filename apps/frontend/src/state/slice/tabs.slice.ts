import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JsonStorage } from 'src/utils/storage'

export enum TabType {
  Home = 'home',
  About = 'about',
  Settings = 'settings',
  Project = 'project',
}

export type DefaultTab = {
  id: string
  type: TabType.Home | TabType.About | TabType.Settings
  label: string
  path: string
  icon?: string
}

export type ProjectTab = {
  id: string
  type: TabType.Project
  label: string
  path: string
  slug: string
}

export type Tab = DefaultTab | ProjectTab

export interface TabsState {
  projectTabIndex: number
  tabs: Tab[]
}

export const homeTab = {
  id: 'home',
  type: TabType.Home,
  label: 'Home',
  path: '/',
} satisfies Tab

export const settingsTab = {
  id: 'settings',
  type: TabType.Settings,
  label: 'Settings',
  path: '/settings',
} satisfies Tab

export const newProjectTab = {
  id: 'new-project',
  type: TabType.Settings,
  label: 'New Project',
  path: '/projects/new',
} satisfies Tab

const initialState: TabsState = {
  projectTabIndex: 0,
  tabs: [homeTab],
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Tab>) => {
      state.projectTabIndex += 1
      state.tabs.push(action.payload)
    },
    remove: (state, action: PayloadAction<Tab['id']>) => {
      const index = state.tabs.findIndex((tab) => tab.id === action.payload)
      if (index === -1) return
      state.tabs.splice(index, 1)
    },
    move: (state, action: PayloadAction<{ tab: Tab; index: number }>) => {
      const { tab, index } = action.payload
      const currentIndex = state.tabs.indexOf(tab)
      if (currentIndex === -1) return
      state.tabs.splice(currentIndex, 1)
      state.tabs.splice(index, 0, tab)
    },
    reorder: (state, action: PayloadAction<Tab[]>) => {
      state.tabs = action.payload
    },
    clearAll: (state) => {
      state.tabs = [homeTab]
    },
  },
})

export const actions = tabsSlice.actions
