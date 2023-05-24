import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { FontWeight } from 'src/theme/fonts'

const baseStyle = defineStyle({
  textStyle: 'button',
  fontWeight: FontWeight.Regular,
  rounded: 0,
  color: 'lighter',
  transition: 'none',
  _hover: {
    color: 'lightest',
    transition: 'none',
    cursor: 'url("/icons/cursor/pointer.png") 8 0, auto',
  },
  _active: {
    color: 'white',
    transition: 'none',
  },
  _focus: {
    transition: 'none',
  },
})

const tabVariant = defineStyle({
  bg: 'darkest',
  borderTop: '2px solid',
  borderLeft: '2px solid',
  borderRight: '2px solid',
  borderColor: 'black',
  borderBottom: '2px solid',
  borderBottomColor: 'black',
  _hover: {
    bg: 'dark',
  },
  _active: {
    bg: 'darker',
    borderBottom: 'none',
    pb: '10px',
  },
})

const solidVariant = defineStyle({})

const outlineVariant = defineStyle({})

const closeIconVariant = defineStyle({
  p: 0,
  boxSize: 5,
  pb: 1.5,
  _hover: {
    color: 'status.red',
    bg: 'transparent',
  },
})

const textOnlyVariant = defineStyle({
  _hover: {
    bg: 'darker',
  },
})

const variants = {
  tab: tabVariant,
  solid: solidVariant,
  outline: outlineVariant,
  'close-icon': closeIconVariant,
  'text-only': textOnlyVariant,
}

const largeSize = defineStyle({})

const mediumSize = defineStyle({})

const smallSize = defineStyle({})

const xsmallSize = defineStyle({})

const sizes = {
  large: largeSize,
  medium: mediumSize,
  small: smallSize,
  xsmall: xsmallSize,
}

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'solid',
    size: 'medium',
  },
})
