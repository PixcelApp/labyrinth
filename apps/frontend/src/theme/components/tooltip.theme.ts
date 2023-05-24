import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { FontWeight } from 'src/theme/fonts'

const baseStyle = defineStyle({
  // textStyle: 'button',
  // fontWeight: FontWeight.Regular,
  // bg: 'darker',
  // color: 'lightest',
  // rounded: 0,
  // transition: 'none',
  // border: 'black',
  bg: 'none',
  shadow: 'none',
  zIndex: 100,
})

const solidVariant = defineStyle({})

const variants = {
  solid: solidVariant,
}

const mediumSize = defineStyle({})

const sizes = {
  medium: mediumSize,
}

export const tooltipTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'solid',
    size: 'medium',
  },
})
