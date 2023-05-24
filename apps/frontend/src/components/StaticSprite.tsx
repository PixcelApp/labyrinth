import { FC } from 'react'
import { useSpriteSheet } from 'src/context/SpriteSheetProvider'
import { getSpriteSheet, SpriteUVs } from 'src/utils/sprites'
import { Box, BoxProps } from '@chakra-ui/react'
import { UI_PIXEL_SCALE } from 'src/constant'

export interface StaticSpriteProps extends BoxProps {
  uvs: SpriteUVs
}

export const StaticSprite: FC<StaticSpriteProps> = ({ uvs, ...props }) => {
  const spriteSheet = useSpriteSheet()
  const sprites = getSpriteSheet(spriteSheet.name)

  return (
    <Box
      bgImg={`url(${sprites})`}
      bgSize={(spriteSheet.size / spriteSheet.scale) * UI_PIXEL_SCALE}
      bgPos={`-${uvs.u * UI_PIXEL_SCALE}px -${uvs.v * UI_PIXEL_SCALE}px`}
      bgRepeat="no-repeat"
      {...props}
    />
  )
}
