import { configureStore } from '@reduxjs/toolkit'
import { globalSlice } from 'src/state/slice/global.slice'
import { tabsSlice } from 'src/state/slice/tabs.slice'
import { projectsSlice } from 'src/state/slice/projects.slice'
import { toolsSlice } from 'src/state/slice/tools.slice'
import { colorsSlice } from 'src/state/slice/colors.slice'
import { JsonStorage } from 'src/utils/storage'

const store = configureStore({
  preloadedState: (await JsonStorage.get('state')) ?? {},
  reducer: {
    [tabsSlice.name]: tabsSlice.reducer,
    [globalSlice.name]: globalSlice.reducer,
    [projectsSlice.name]: projectsSlice.reducer,
    [toolsSlice.name]: toolsSlice.reducer,
    [colorsSlice.name]: colorsSlice.reducer,
  } as const,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.subscribe(() => JsonStorage.set('state', store.getState()))

export { store }
