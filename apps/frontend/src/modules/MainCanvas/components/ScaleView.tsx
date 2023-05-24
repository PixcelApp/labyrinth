import { HStack, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { Viewport } from 'pixi-viewport'
import { clamp } from 'src/utils/math'
import { getSpriteUVs } from 'src/utils/sprites'
import { StaticSprite } from 'src/components/StaticSprite'
import { CanvasBox } from 'src/components/CanvasBox'
import { useTextureFromUVs } from 'src/hooks/useTextureFromUVs'

export interface ScaleViewProps {
  viewport: Viewport
}

export const ScaleView: FC<ScaleViewProps> = ({ viewport }) => {
  const texture = useTextureFromUVs(getSpriteUVs(15, 15, 51, 0))
  const [scale, setScale] = useState(0) // %

  const onViewportZoomed = () => {
    const scale_raw = viewport.scale.x

    const scale_raw_min = 0.04
    const scale_raw_max = 4

    const scale_min = 1
    const scale_max = 100

    const scale = clamp(
      scale_raw,
      scale_raw_min,
      scale_raw_max,
      scale_min,
      scale_max,
    )

    setScale(Math.floor(scale))
  }

  useEffect(() => {
    viewport.on('zoomed', onViewportZoomed)

    return () => {
      viewport.off('zoomed', onViewportZoomed)
    }
  }, [])

  return (
    <CanvasBox texture={texture} edges={4} py={1}>
      <HStack boxSize="full" justify="space-between" px={2}>
        <StaticSprite uvs={getSpriteUVs(9, 30, 119)} boxSize={4.5} />
        <Text>{scale}%</Text>
      </HStack>
    </CanvasBox>
  )
}
