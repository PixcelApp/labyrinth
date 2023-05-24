import { FC, useEffect, useRef, useState } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { Canvas, CanvasBox } from 'src/components/CanvasBox'
import { useColors } from 'src/hooks/useColors'
import { useTextureFromUVs } from 'src/hooks/useTextureFromUVs'
import { getSpriteUVs } from 'src/utils/sprites'
import { useBoolean } from 'src/hooks/useBoolean'
import { useActiveColor, useColorPicker } from 'src/hooks/store.hooks'
import { RGB } from 'src/utils/colors'

export interface ColourPickerProps {}

export const ColourPicker: FC<ColourPickerProps> = ({}) => {
  const colors = useColors()
  const frameTexture = useTextureFromUVs(getSpriteUVs(15, 51, 60))

  const [hueTopOffset, setHueTopOffset] = useState(0)

  const [activeColor, setActiveColor] = useActiveColor()
  const {
    picker: { color, hue },
    setColor,
    setHue,
  } = useColorPicker()

  const mainColorPickerParentRef = useRef<HTMLDivElement>(null)
  const mainColorPickerRef = useRef<HTMLCanvasElement>(null)
  const rainbowPickerParentRef = useRef<HTMLDivElement>(null)
  const rainbowPickerRef = useRef<HTMLCanvasElement>(null)

  const [isSelectingHue, setIsSelectingHue] = useBoolean(false)
  const [isSelectingColor, setIsSelectingColor] = useBoolean(false)

  useEffect(() => {
    if (!rainbowPickerParentRef.current) return

    const { top } = rainbowPickerParentRef.current.getBoundingClientRect()

    setHueTopOffset(top)
  }, [rainbowPickerParentRef.current])

  useEffect(() => {
    if (!rainbowPickerRef.current || !rainbowPickerParentRef.current) return

    const canvas = rainbowPickerRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const { width, height } =
      rainbowPickerParentRef.current.getBoundingClientRect()

    canvas.width = width
    canvas.height = height

    // the generic colour picker gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)')
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)')
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)')
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)')
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)')
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)')
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)')

    ctx.fillStyle = gradient

    ctx.fillRect(0, 0, width, height)

    const onRainbowPickerMouseMove = (e: MouseEvent) => {
      if (!rainbowPickerParentRef.current) return

      const { x } = e
      const { left } = rainbowPickerParentRef.current.getBoundingClientRect()

      if (isSelectingHue) {
        setHue({
          x,
          value: Math.round(((x - left) / width) * 360),
        })
      }
    }

    const onMouseDown = () => setIsSelectingHue.on()
    const onMouseUp = () => setIsSelectingHue.off()
    const onMouseLeave = () => setIsSelectingHue.off()

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('mousemove', onRainbowPickerMouseMove)

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('mousemove', onRainbowPickerMouseMove)
    }
  }, [rainbowPickerRef, rainbowPickerParentRef, hue, isSelectingHue])

  useEffect(() => {
    if (!mainColorPickerRef.current || !mainColorPickerParentRef.current) return

    const canvas = mainColorPickerRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const { width, height } =
      mainColorPickerParentRef.current.getBoundingClientRect()

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = `hsl(${hue.value}, 100%, 50%)`
    ctx.fillRect(0, 0, width, height)

    // apply the white gradient // from left to right
    const whiteGradient = ctx.createLinearGradient(0, 0, width, 0)
    whiteGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    whiteGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = whiteGradient
    ctx.fillRect(0, 0, width, height)

    // apply the black gradient
    const blackGradient = ctx.createLinearGradient(0, 0, 0, height)
    blackGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    blackGradient.addColorStop(1, 'rgba(0, 0, 0, 1)')

    ctx.fillStyle = blackGradient
    ctx.fillRect(0, 0, width, height)

    const getData = (e: MouseEvent) => {
      if (!mainColorPickerParentRef.current) return
      const { y, x } = e
      const { top, left } =
        mainColorPickerParentRef.current.getBoundingClientRect()

      const pixel = ctx.getImageData(x - left, y - top, 1, 1)
      const data = pixel.data

      const color = [data[0], data[1], data[2], data[3] / 255] as const

      return { x, y, color }
    }

    const onMainColorPickerMouseMove = (e: MouseEvent) => {
      if (!isSelectingColor) {
        return
      }

      const data = getData(e)

      if (data) {
        setColor({
          x: data.x,
          y: data.y,
          value: new RGB(...data.color).toString(),
        })
      }
    }

    const onMouseDown = () => setIsSelectingColor.on()
    const onMouseUp = () => setIsSelectingColor.off()
    const onMouseLeave = () => setIsSelectingColor.off()

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('mousemove', onMainColorPickerMouseMove)

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('mousemove', onMainColorPickerMouseMove)
    }
  }, [
    color,
    mainColorPickerRef,
    mainColorPickerParentRef,
    hue,
    isSelectingColor,
  ])

  useEffect(() => {
    if (!mainColorPickerRef.current || !mainColorPickerParentRef.current) return

    const ctx = mainColorPickerRef.current.getContext('2d')
    if (ctx) {
      const { top, left } =
        mainColorPickerParentRef.current.getBoundingClientRect()

      const pixel = ctx.getImageData(color.x - left, color.y - top, 1, 1)
      const data = pixel.data

      const newColor = [data[0], data[1], data[2], data[3] / 255] as const

      if (isSelectingHue) {
        setColor({
          x: color.x,
          y: color.y,
          value: new RGB(...newColor).toString(),
        })
      }
    }
  }, [mainColorPickerRef, mainColorPickerParentRef, hue])

  useEffect(() => {
    setActiveColor(RGB.fromString(color.value))
  }, [color])

  return (
    <Box boxSize="full">
      <Box
        pos="absolute"
        zIndex={2}
        top={`calc(${color.y}px - 2px)`}
        left={`calc(${color.x}px - 2px)`}
        w="4px"
        h="4px"
        outline={`2px solid ${colors.black}`}
        pointerEvents="none"
      />
      <Box
        pos="absolute"
        zIndex={2}
        top={`calc(${hueTopOffset}px + 4px)`}
        left={`calc(${hue.x}px - 2px)`}
        w="4px"
        h="24px"
        outline={`2px solid ${colors.black}`}
        pointerEvents="none"
      />
      <VStack spacing={2}>
        <CanvasBox edges={4} texture={frameTexture} shouldOverlay>
          <Box
            rounded="12px"
            ref={mainColorPickerParentRef}
            w="180px"
            h="180px"
            pos="relative"
            bg="black"
            overflow="hidden"
          >
            <Canvas ref={mainColorPickerRef} zIndex={1} pointerEvents="all" />
          </Box>
        </CanvasBox>
        <CanvasBox w="full" edges={4} texture={frameTexture} shouldOverlay>
          <Box
            rounded="12px"
            ref={rainbowPickerParentRef}
            w="full"
            h="32px"
            pos="relative"
            bg="black"
            overflow="hidden"
          >
            <Canvas ref={rainbowPickerRef} zIndex={1} pointerEvents="all" />
          </Box>
        </CanvasBox>

        <CanvasBox w="full" edges={4} texture={frameTexture} shouldOverlay>
          <Box rounded="12px" w="full" h="32px" bg={color.value.toString()} />
        </CanvasBox>

        <CanvasBox w="full" edges={4} texture={frameTexture} shouldOverlay>
          <Box rounded="12px" w="full" h="32px" bg={activeColor.toString()} />
        </CanvasBox>
      </VStack>
    </Box>
  )
}
