import { FC, PropsWithChildren, useEffect, useMemo, useRef } from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import { Graphics, Text as PixiText } from 'pixi.js'
import { FrameManager } from 'src/modules/MainCanvas/managers/FrameManager'
import { AppManager } from 'src/modules/MainCanvas/managers/AppManager'
import { ViewportManager } from 'src/modules/MainCanvas/managers/ViewportManager'
import { PIXEL_SCALE, PROJECT, WORLD } from 'src/modules/MainCanvas/constants'
import { clamp } from 'src/utils/math'
import { ScaleView } from 'src/modules/MainCanvas/components/ScaleView'
import { Project } from 'src/state/slice/projects.slice'
import { useColors } from 'src/hooks/useColors'
import { getSpriteSheet, getSpriteUVsAsString } from 'src/utils/sprites'
import { CanvasBox } from 'src/components/CanvasBox'
import { useSpriteSheet } from 'src/context/SpriteSheetProvider'

export interface MainCanvasProps extends PropsWithChildren {
  project: Project
}

const BG_GRID_GREY_DARK = '#808080'
const BG_GRID_GREY_LIGHT = '#c0c0c0'
const BG_GRID_SIZE = 16

const ARTBOARD_OUTLINE_SIZE = 16

export const MainCanvas: FC<MainCanvasProps> = ({ project }) => {
  const colors = useColors()
  const spriteSheet = useSpriteSheet()
  const parentRef = useRef<HTMLDivElement>(null)

  const appManager = useMemo(() => new AppManager().create(), [])
  const viewportManager = useMemo(
    () => new ViewportManager(appManager.app).create(),
    [appManager.app],
  )
  const frames = useMemo(
    () => new FrameManager(appManager.app),
    [appManager.app],
  )

  const app = appManager.app
  const viewport = viewportManager.viewport

  useEffect(() => {
    if (!parentRef.current) return

    // @ts-ignore
    parentRef.current.appendChild(app.view)

    appManager.setup()
    viewportManager.setup()

    const easterEggText = new PixiText('hi ~ :3', {
      fill: 'white',
      fontFamily: "'pixelFJ8pt1', monospace",
    })

    easterEggText.x = WORLD.x + 8
    easterEggText.y = WORLD.y + 8

    const worldBounds = new Graphics()
      .beginFill(colors.black)
      .drawRect(WORLD.x, WORLD.y, WORLD.width, WORLD.height)
      .endFill()

    const project = new Graphics()
      .beginFill(colors.darkest)
      .drawRect(PROJECT.x, PROJECT.y, PROJECT.width, PROJECT.height)
      .endFill()

    const artboard_size = {
      width: 256 * PIXEL_SCALE,
      height: 192 * PIXEL_SCALE,
      x: WORLD.center.x - (256 * PIXEL_SCALE) / 2 - 128,
      y: WORLD.center.y - (192 * PIXEL_SCALE) / 2 - 96,
    }

    const artboard = new Graphics()

    const test_pixel = new Graphics()
      .beginFill('#ff0000')
      .drawRect(WORLD.center.x, WORLD.center.y, PIXEL_SCALE, PIXEL_SCALE)
      .endFill()
    viewport.addChild(worldBounds)
    worldBounds.addChild(easterEggText)
    worldBounds.addChild(project)
    project.addChild(artboard)
    artboard.addChild(test_pixel)

    const drawArtboard = (lineScale = 0.4) => {
      artboard.clear()

      // draw a background transparent block checkerboard
      for (
        let x = 0;
        x < artboard_size.width;
        x += BG_GRID_SIZE * PIXEL_SCALE
      ) {
        for (
          let y = 0;
          y < artboard_size.height;
          y += BG_GRID_SIZE * PIXEL_SCALE
        ) {
          artboard.beginFill(
            (x + y) % (BG_GRID_SIZE * PIXEL_SCALE * 2) === 0
              ? BG_GRID_GREY_DARK
              : BG_GRID_GREY_LIGHT,
          )
          artboard.drawRect(
            x + artboard_size.x,
            y + artboard_size.y,
            BG_GRID_SIZE * PIXEL_SCALE,
            BG_GRID_SIZE * PIXEL_SCALE,
          )
          artboard.endFill()
        }
      }

      // draw outline
      artboard.lineStyle(ARTBOARD_OUTLINE_SIZE, colors.black, 1)
      artboard.drawRect(
        artboard_size.x - ARTBOARD_OUTLINE_SIZE / 2,
        artboard_size.y - ARTBOARD_OUTLINE_SIZE / 2,
        artboard_size.width + ARTBOARD_OUTLINE_SIZE,
        artboard_size.height + ARTBOARD_OUTLINE_SIZE,
      )

      // a line only at the bottom that is a "shadow"
      artboard.lineStyle(ARTBOARD_OUTLINE_SIZE, colors.black, 0.4)
      artboard.moveTo(
        artboard_size.x,
        artboard_size.y +
          artboard_size.height +
          ARTBOARD_OUTLINE_SIZE / 2 +
          ARTBOARD_OUTLINE_SIZE,
      )
      artboard.lineTo(
        artboard_size.x + artboard_size.width,
        artboard_size.y +
          artboard_size.height +
          ARTBOARD_OUTLINE_SIZE / 2 +
          ARTBOARD_OUTLINE_SIZE,
      )

      if (viewport.scale.x < 0.25) return

      for (
        let x = artboard_size.x;
        x < artboard_size.x + artboard_size.width;
        x += PIXEL_SCALE
      ) {
        artboard.lineStyle(lineScale, '#a2a2a3', 1)
        artboard.moveTo(x, artboard_size.y)
        artboard.lineTo(x, artboard_size.y + artboard_size.height)
      }

      for (
        let y = artboard_size.y;
        y < artboard_size.y + artboard_size.height;
        y += PIXEL_SCALE
      ) {
        artboard.lineStyle(lineScale, '#a2a2a3', 1)
        artboard.moveTo(artboard_size.x, y)
        artboard.lineTo(artboard_size.x + artboard_size.width, y)
      }
    }

    drawArtboard()

    viewport.on('zoomed', () => {
      const lineScale = clamp(1 / viewport.scale.x, 0, 1)
      drawArtboard(lineScale)
    })

    frames.start()

    return () => {
      frames.stop()
    }
  }, [parentRef.current])

  useEffect(() => {
    if (!parentRef.current) return
    const onResize = () => {
      if (!parentRef.current) return
      const { width, height } = parentRef.current.getBoundingClientRect()
      appManager.resize(width, height)
      viewportManager.resize(width, height)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [parentRef.current])

  const sprites = getSpriteSheet(spriteSheet.name)
  const texture = `${sprites}?${getSpriteUVsAsString(15, 51, 15)}`

  return (
    <Box h="full" py={2} flexGrow={1}>
      <CanvasBox
        p={1}
        edges={3}
        texture={texture}
        boxSize="full"
        pos="relative"
        bg="darker"
        shouldOverlay
      >
        <Box
          h="full"
          flexGrow={1}
          draggable={false}
          userSelect="none"
          pos="relative"
          border="2px solid"
          borderColor="black"
        >
          <HStack pos="absolute" zIndex={1} top={2} left={2} userSelect="none">
            <ScaleView viewport={viewport} />
          </HStack>
          <Box
            ref={parentRef}
            inset={0}
            bg="dark"
            boxSize="full"
            pos="absolute"
          />
        </Box>
      </CanvasBox>
    </Box>
  )
}
