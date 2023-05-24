import { FC, useEffect, useRef, useState } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { Canvas, CanvasBox } from 'src/components/CanvasBox'
import { useColors } from 'src/hooks/useColors'
import { useTextureFromUVs } from 'src/hooks/useTextureFromUVs'
import { getSpriteUVs } from 'src/utils/sprites'
import { useBoolean } from 'src/hooks/useBoolean'

export interface ColourPaletteProps {}

export const ColourPalette: FC<ColourPaletteProps> = ({}) => {
  return (
    <Box w="full">
        <p>aa</p>
    </Box>
  )
}
