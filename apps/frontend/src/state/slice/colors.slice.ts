import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RGB, RGBString } from 'src/utils/colors'

export interface PickerState {
  color: {
    x: number
    y: number
    value: RGBString
  }
  hue: {
    x: number
    value: number
  }
}

export interface GlobalState {
  active: RGBString
  picker: PickerState
  palette: RGBString[]
}

const colors = {
  black: new RGB(0, 0, 0),
  white: new RGB(255, 255, 255),
  red: new RGB(255, 0, 0),
}

const initialState: GlobalState = {
  active: colors.black.toString(),
  palette: [
    colors.black.toString(),
    colors.white.toString(),
    colors.red.toString(),
  ],
  picker: {
    color: {
      x: 0,
      y: 0,
      value: colors.red.toString(),
    },
    hue: {
      x: 0,
      value: 0,
    },
  },
}

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<RGBString>) => {
      state.active = action.payload
    },
    setPalette: (state, action: PayloadAction<RGBString[]>) => {
      state.palette = action.payload.map((c) => c)
    },
    addPaletteColor: (state, action: PayloadAction<RGBString>) => {
      state.palette.push(action.payload)
    },
    removePaletteColor: (state, action: PayloadAction<RGBString>) => {
      state.palette = state.palette.filter((color) => color !== action.payload)
    },
    clearPalette: (state) => {
      state.palette = []
    },
    setPickerColor: (state, action: PayloadAction<PickerState['color']>) => {
      state.picker.color = action.payload
    },
    setPickerHue: (state, action: PayloadAction<PickerState['hue']>) => {
      state.picker.hue = action.payload
    },
    setPicker: (state, action: PayloadAction<PickerState>) => {
      state.picker = action.payload
    },
  },
})

export const actions = colorsSlice.actions
