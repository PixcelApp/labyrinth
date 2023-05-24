import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JsonStorage } from 'src/utils/storage'

export interface ProjectSettings {}

export interface Project {
  name: string
  slug: string
  settings: ProjectSettings
}

export interface RecentProject {
  project: Project
  lastOpened: number
  screenshotUrl: string
}

export interface ProjectsState {
  projects: Array<Project>
  recents: Array<RecentProject>
}

const initialState: ProjectsState = {
  projects: [],
  recents: [],
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Array<Project>>) => {
      state.projects = action.payload
    },
    addProject: (state, action: PayloadAction<Project>) => {
      const duplicateSlugs =
        state.projects.filter((project) => project.slug === action.payload.slug)
          .length +
        state.recents.filter(
          (recent) => recent.project.slug === action.payload.slug,
        ).length -
        1

      if (duplicateSlugs > 0) {
        action.payload.name = `${action.payload.name} (${duplicateSlugs})`
        action.payload.slug = `${action.payload.slug}-${duplicateSlugs}`
      }

      state.projects.push(action.payload)
    },
    removeProject: (state, action: PayloadAction<Project>) => {
      state.projects = state.projects.filter(
        (project) => project.slug !== action.payload.slug,
      )
    },
    setRecents: (state, action: PayloadAction<Array<RecentProject>>) => {
      state.recents = action.payload
    },
    addRecent: (state, action: PayloadAction<RecentProject>) => {
      state.recents.push(action.payload)
    },
    removeRecent: (state, action: PayloadAction<RecentProject>) => {
      state.recents = state.recents.filter(
        (recent) => recent.project.slug !== action.payload.project.slug,
      )
    },
  },
})

export const actions = projectsSlice.actions
