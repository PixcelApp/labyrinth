import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum Tool {
  Pencil,
  Select,
  Rectangle,
  Zoom,
  Line,
  Cross,
  Droplet,
  Triangle,
}

export enum ToolAction {
  Select,
}

export interface ToolsState {
  selected?: Tool
}

const initialState: ToolsState = {}

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Tool>) => {
      state.selected = action.payload
    },
  },
})

export const actions = toolsSlice.actions
