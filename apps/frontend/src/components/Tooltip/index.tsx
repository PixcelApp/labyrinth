import {
  Box,
  Text,
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'
import { FC } from 'react'
import { CanvasBox } from 'src/components/CanvasBox'
import { getSpriteSheet, getSpriteUVsAsString } from 'src/utils/sprites'
import { useSpriteSheet } from 'src/context/SpriteSheetProvider'

export interface TooltipProps extends ChakraTooltipProps {}

export const Tooltip: FC<TooltipProps> = ({
  placement = 'bottom',
  label,
  children,
  ...props
}) => {
  const spriteSheet = useSpriteSheet()

  const sprites = getSpriteSheet(spriteSheet.name)

  const scale = 2.5

  const hasY = placement.includes('top') || placement.includes('bottom')
  const hasX = placement.includes('start') || placement.includes('end')

  const arrowSize = 5
  const arrowOffset = 3
  const arrowX = 66

  const arrow = (
    <Box
      h={`${arrowSize * scale}px`}
      w={`${arrowSize * scale}px`}
      pos="absolute"
      bg="transparent"
      bgImg={`url(${sprites})`}
      bgSize={(spriteSheet.size / spriteSheet.scale) * scale}
      bgPos={`-${arrowX * scale}px 0px`}
      margin="auto"
      left={
        placement.includes('end') || !hasX
          ? `-${arrowOffset * scale}px`
          : 'auto'
      }
      right={
        placement.includes('start') || !hasX
          ? `-${arrowOffset * scale}px`
          : 'auto'
      }
      top={
        placement.includes('top') || !hasY
          ? `-${arrowOffset * scale}px`
          : 'auto'
      }
      bottom={
        placement.includes('bottom') || !hasY
          ? `-${arrowOffset * scale}px`
          : 'auto'
      }
    />
  )

  const texture = `${sprites}?${getSpriteUVsAsString(15, 51, 0)}`

  return (
    <ChakraTooltip
      placement={placement}
      label={
        <CanvasBox py={2} px={4} edges={4} texture={texture} pos="relative">
          <Text color="lighter">{label}</Text>
          {arrow}
        </CanvasBox>
      }
      {...props}
    >
      {children}
    </ChakraTooltip>
  )
}
