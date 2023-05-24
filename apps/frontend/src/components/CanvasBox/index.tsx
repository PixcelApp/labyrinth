import {
  useRef,
  useState,
  useEffect,
  type FocusEvent,
  type MouseEvent,
  type PropsWithChildren,
} from 'react'
import {
  Box,
  chakra,
  Flex,
  type As,
  type BoxProps,
  type FlexProps,
  type ChakraComponent,
} from '@chakra-ui/react'
import { useBoolean } from 'src/hooks/useBoolean'
import { UI_PIXEL_SCALE } from 'src/constant'

export type CanvasRenderProps<T extends BoxProps> = PropsWithChildren & {
  edges: number
  texture: string
  shouldOverlay?: boolean
  RenderComponent: ChakraComponent<As, T>
} & T

export const Canvas = chakra('canvas', {
  baseStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    boxSize: 'full',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: -1,
    imageRendering: 'pixelated',
  },
})

export const CanvasRender = <T extends BoxProps>({
  texture,
  edges,
  shouldOverlay,
  RenderComponent,
  ...boxProps
}: CanvasRenderProps<T>) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const img = new Image()

  const draw = () => {
    const box = boxRef.current
    const canvas = canvasRef.current
    if (!box || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let { width, height } = box.getBoundingClientRect()
    canvas.width = width / UI_PIXEL_SCALE
    canvas.height = height / UI_PIXEL_SCALE

    width = canvas.width
    height = canvas.height

    if (ctx.imageSmoothingEnabled) {
      ctx.imageSmoothingEnabled = false
    }

    const params = new URLSearchParams(texture.split('?')[1])
    const u = Number(params.get('u') ?? '0')
    const v = Number(params.get('v') ?? '0')
    const w = Number(params.get('w') ?? '0')
    const h = Number(params.get('h') ?? '0')

    ctx.clearRect(0, 0, width, height)

    // top left
    ctx.drawImage(img, u, v, edges, edges, 0, 0, edges, edges)

    // top right
    ctx.drawImage(
      img,
      u + w - edges,
      v,
      edges,
      edges,
      width - edges,
      0,
      edges,
      edges,
    )

    // bottom left
    ctx.drawImage(
      img,
      u,
      v + h - edges,
      edges,
      edges,
      0,
      height - edges,
      edges,
      edges,
    )

    // bottom right
    ctx.drawImage(
      img,
      u + w - edges,
      v + h - edges,
      edges,
      edges,
      width - edges,
      height - edges,
      edges,
      edges,
    )

    // top
    ctx.drawImage(
      img,
      u + edges,
      v,
      w - edges - edges,
      edges,
      edges,
      0,
      width - edges - edges,
      edges,
    )

    // bottom
    ctx.drawImage(
      img,
      u + edges,
      v + h - edges,
      w - edges - edges,
      edges,
      edges,
      height - edges,
      width - edges - edges,
      edges,
    )

    // left
    ctx.drawImage(
      img,
      u,
      v + edges,
      edges,
      h - edges - edges,
      0,
      edges,
      edges,
      height - edges - edges,
    )

    // right
    ctx.drawImage(
      img,
      u + w - edges,
      v + edges,
      edges,
      h - edges - edges,
      width - edges,
      edges,
      edges,
      height - edges - edges,
    )

    // center
    ctx.drawImage(
      img,
      u + edges,
      v + edges,
      w - edges - edges,
      h - edges - edges,
      edges,
      edges,
      width - edges - edges,
      height - edges - edges,
    )
  }

  useEffect(() => {
    img.onload = () => draw()

    img.src = texture

    return () => {
      img.onload = null
    }
  }, [texture])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(draw)
    resizeObserver.observe(boxRef.current!)

    return () => resizeObserver.disconnect()
  }, [texture])

  return (
    // @ts-ignore
    <RenderComponent ref={boxRef} zIndex={1} {...boxProps} pos="relative">
      {boxProps.children}
      <Canvas ref={canvasRef as any} zIndex={shouldOverlay ? 1 : undefined} />
    </RenderComponent>
  )
}

export type CanvasBoxProps = Omit<
  CanvasRenderProps<BoxProps>,
  'RenderComponent'
>

export const CanvasBox = (props: CanvasBoxProps) => (
  <CanvasRender {...props} RenderComponent={Box} />
)

export type CanvasFlexProps = Omit<
  CanvasRenderProps<FlexProps>,
  'RenderComponent'
>

export const CanvasFlex = (props: CanvasFlexProps) => (
  <CanvasRender {...props} RenderComponent={Flex} />
)

export type CanvasInteractiveProps<T extends BoxProps> = Omit<
  CanvasRenderProps<T>,
  'texture' | 'RenderComponent'
> & {
  defaultTexture: string | (() => string)
  hoverTexture?: string | (() => string)
  activeTexture?: string | (() => string)
  disabledTexture?: string | (() => string)
  focusedTexture?: string | (() => string)
  onClick?: (e: MouseEvent) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
  onMouseDown?: (e: MouseEvent) => void
  onMouseUp?: (e: MouseEvent | globalThis.MouseEvent) => void
  RenderComponent?: ChakraComponent<As, T>
  isActive?: boolean
}

export const CanvasInteractive = <T extends BoxProps>({
  RenderComponent,
  ...props
}: CanvasInteractiveProps<T>) => {
  const [texture, setTexture] = useState(props.defaultTexture)
  const [isHovering, setHovering] = useBoolean(false)
  const [isClicking, setClicking] = useBoolean(false)

  const notActiveResetTexture = props.isActive
    ? props.defaultTexture
    : props.activeTexture

  const resetTexture =
    (typeof props.isActive !== 'boolean'
      ? props.defaultTexture
      : notActiveResetTexture) ?? props.defaultTexture

  const interceptOnClick = (e: MouseEvent) => {
    if (props.onClick) {
      props.onClick(e)
    }
  }

  const interceptOnMouseEnter = (e: MouseEvent) => {
    if (!isClicking) {
      setTexture(props.hoverTexture ?? resetTexture)
    }
    if (props.onMouseEnter) {
      props.onMouseEnter(e)
    }
    setHovering.on()
  }

  const interceptOnMouseLeave = (e: MouseEvent) => {
    if (!isClicking) {
      setTexture(resetTexture)
    }
    if (props.onMouseLeave) {
      props.onMouseLeave(e)
    }
    setHovering.off()
  }

  const interceptOnMouseDown = (e: MouseEvent) => {
    setTexture(props.activeTexture ?? resetTexture)
    if (props.onMouseDown) {
      props.onMouseDown(e)
    }
    setClicking.on()
  }

  const interceptOnMouseUp = (e: MouseEvent) => {
    setTexture(isHovering ? props.hoverTexture ?? resetTexture : resetTexture)
    if (props.onMouseUp) {
      props.onMouseUp(e)
    }
    setClicking.off()
  }

  const interceptOnFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (!isHovering) {
      setTexture(props.focusedTexture ?? resetTexture)
    }
    if (props.onFocus) {
      props.onFocus(e)
    }
    setHovering.on()
  }

  const interceptOnBlur = (e: FocusEvent<HTMLDivElement>) => {
    setTexture(resetTexture)
    if (props.onBlur) {
      props.onBlur(e)
    }
    setHovering.off()
  }

  useEffect(() => {
    if (!isHovering && isClicking) {
      const onMouseUp = (e: globalThis.MouseEvent) => {
        if (!isHovering) {
          setTexture(resetTexture)
          props?.onMouseUp?.(e)
        }
      }

      window.addEventListener('mouseup', onMouseUp)

      return () => window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isHovering])

  useEffect(() => {
    setTexture(resetTexture)
  }, [props.isActive])

  return (
    /* @ts-ignore */
    <CanvasRender
      {...props}
      zIndex={1}
      RenderComponent={RenderComponent ?? Box}
      texture={texture}
      onClick={interceptOnClick}
      onMouseEnter={interceptOnMouseEnter}
      onMouseLeave={interceptOnMouseLeave}
      onMouseDown={interceptOnMouseDown}
      onMouseUp={interceptOnMouseUp}
      onFocus={interceptOnFocus}
      onBlur={interceptOnBlur}
    />
  )
}
