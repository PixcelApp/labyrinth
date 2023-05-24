import { createSlice } from '@reduxjs/toolkit'

export interface GlobalState {}

const initialState: GlobalState = {}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
})

export const actions = globalSlice.actions
