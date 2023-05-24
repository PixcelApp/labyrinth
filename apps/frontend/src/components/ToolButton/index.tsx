import { FC } from 'react'
import { Box, Center, CenterProps, IconButton } from '@chakra-ui/react'
import { useSpriteSheet } from 'src/context/SpriteSheetProvider'
import { Tooltip } from 'src/components/Tooltip'
import { UI_PIXEL_SCALE } from 'src/constant'

export interface ToolButtonProps {
  label: string
  icon: [x: number, y: number]
  isSelected?: boolean
  onClick?: () => void
}

export const ToolButton: FC<ToolButtonProps> = ({
  label,
  icon,
  isSelected,
  onClick,
}) => {
  const spriteSheet = useSpriteSheet()

  const size = {
    h: 18,
    w: 17,
  }

  const iconSize = 9

  const yOffset = Number(isSelected ?? false) * 36 * UI_PIXEL_SCALE

  const spriteStyles = {
    bgColor: 'transparent',
    bgImg: `url(/themes/${spriteSheet.name}/sprites.png)`,
    bgSize: (spriteSheet.size / spriteSheet.scale) * 2,
    bgPos: `0px -${yOffset}px`,
    shadow: 'none',
  } satisfies CenterProps

  return (
    <Tooltip placement="end" label={label}>
      <Center
        as={IconButton}
        size="unstyled"
        variant="unstyled"
        aria-label={label}
        h={`${size.h * UI_PIXEL_SCALE}px`}
        w={`${size.w * UI_PIXEL_SCALE}px`}
        onClick={onClick}
        zIndex={isSelected ? 1 : 'auto'}
        icon={
          <Box
            mb={`${UI_PIXEL_SCALE}px`}
            boxSize={`${iconSize * UI_PIXEL_SCALE}px`}
            {...spriteStyles}
            bgPos={icon.map((v) => `-${v * UI_PIXEL_SCALE}px`).join(' ')}
          />
        }
        {...spriteStyles}
        _hover={{
          ...spriteStyles,
          bgPos: `-${size.w * UI_PIXEL_SCALE}px -${yOffset}px`,
        }}
        _focus={{
          ...spriteStyles,
          zIndex: 2,
          bgPos: `0px -${size.h * UI_PIXEL_SCALE + yOffset}px`,
          _hover: {
            ...spriteStyles,
            bgPos: `-${size.w * UI_PIXEL_SCALE}px -${
              size.h * UI_PIXEL_SCALE + yOffset
            }px`,
          },
          _active: {
            ...spriteStyles,
            bgPos: `-${size.w * UI_PIXEL_SCALE * UI_PIXEL_SCALE}px -${
              size.h * UI_PIXEL_SCALE + yOffset
            }px`,
            div: {
              mb: `-${UI_PIXEL_SCALE}px`,
              opacity: 0.5,
            },
          },
        }}
      />
    </Tooltip>
  )
}
