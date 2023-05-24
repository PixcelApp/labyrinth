import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { FontWeight } from 'src/theme/fonts'
import { menuAnatomy } from '@chakra-ui/anatomy'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const noTransition = {
  transition: 'none',
  _hover: {
    transition: 'none',
  },
  _active: {
    transition: 'none',
  },
  _focus: {
    transition: 'none',
  },
} as const

const baseStyle = definePartsStyle({
  list: {
    zIndex: 100,
    p: 0,
    textStyle: 'button',
    fontWeight: FontWeight.Regular,
    rounded: 0,
    color: 'lighter',
    shadow: 'none',
    ...noTransition,
  },
  item: {
    ...noTransition,
    py: 2,
    px: 2.5,
    cursor: 'url("/icons/cursor/pointer.png") 8 0, auto',
  },
  divider: {
    p: 0,
    m: 0,
  },
})
const solidVariant = definePartsStyle({
  list: {
    bg: 'darkest',
    borderWidth: '2px',
    borderColor: 'black',
  },
  item: {
    bg: 'darkest',
    _hover: {
      bg: 'darker',
    },
  },
  divider: {
    opacity: 1,
    borderWidth: '2px',
    borderColor: 'black',
  },
})

const variants = {
  solid: solidVariant,
}

const mediumSize = definePartsStyle({})

const sizes = {
  medium: mediumSize,
}

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'solid',
    size: 'medium',
  },
})
