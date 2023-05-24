import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/state'
import { actions as tabsActions } from 'src/state/slice/tabs.slice'
import {
  actions as colorsActions,
  PickerState,
} from 'src/state/slice/colors.slice'
import { useLocation } from 'react-router-dom'
import { RGB } from 'src/utils/colors'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useProjects = () => useAppSelector((state) => state.projects)

export const useTabs = () => {
  const data = useAppSelector((state) => state.tabs)
  const actions = tabsActions
  return {
    ...data,
    actions,
  }
}

export const useGlobal = () => useAppSelector((state) => state.global)

export const useIsProject = () => {
  const { pathname } = useLocation()
  return pathname.includes('project')
}

export const useActiveColor = () => {
  const dispatch = useDispatch()

  const activeColor = useAppSelector((state) => state.colors.active)

  const setActiveColor = (color: RGB) =>
    dispatch(colorsActions.setActive(color.toString()))

  return [RGB.fromString(activeColor), setActiveColor] as const
}

export const useColorPalette = () => {
  const dispatch = useDispatch()

  const palette = useAppSelector((state) => state.colors.palette)

  const addColor = (color: RGB) =>
    dispatch(colorsActions.addPaletteColor(color.toString()))

  const removeColor = (color: RGB) =>
    dispatch(colorsActions.removePaletteColor(color.toString()))

  const clearPalette = () => dispatch(colorsActions.clearPalette())

  return {
    palette: palette.map(RGB.fromString),
    addColor,
    removeColor,
    clearPalette,
  } as const
}

export const useColorPicker = () => {
  const dispatch = useDispatch()
  const picker = useAppSelector((state) => state.colors.picker)

  const setColor = (color: PickerState['color']) =>
    dispatch(colorsActions.setPickerColor(color))

  const setHue = (hue: PickerState['hue']) =>
    dispatch(colorsActions.setPickerHue(hue))

  const set = (picker: PickerState) => dispatch(colorsActions.setPicker(picker))

  return {
    picker,
    setColor,
    setHue,
    set,
  }
}
