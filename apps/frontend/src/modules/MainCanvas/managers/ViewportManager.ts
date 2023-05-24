import { Application } from 'pixi.js'
import { IViewportOptions, Viewport } from 'pixi-viewport'
import {
  PIXEL_SCALE,
  WORLD,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from 'src/modules/MainCanvas/constants'
import { CustomWheelPlugin } from 'src/modules/MainCanvas/modules/viewport/plugins/CustomWheelPlugin'

export class ViewportManager {
  static options = {
    passiveWheel: false,
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    disableOnContextMenu: true,
  } satisfies Omit<IViewportOptions, 'events'>

  public viewport: Viewport

  constructor(private app: Application) {
    this.viewport = new Viewport({
      ...ViewportManager.options,
      events: app.renderer.events,
    })
  }

  create(options: Omit<IViewportOptions, 'events'> = {}) {
    this.viewport = new Viewport({
      ...ViewportManager.options,
      ...options,
      events: this.app.renderer.events,
    })

    return this
  }

  setup() {
    const { app, viewport } = this

    viewport.drag()

    viewport.pinch()

    viewport.clampZoom({
      minScale: 0.04,
      maxScale: 4,
    })

    viewport.plugins.add(
      'wheel',
      new CustomWheelPlugin(viewport, {
        steps: 10,
        keyToNotPress: [
          'ControlLeft',
          'ControlRight',
          'MetaLeft',
          'MetaRight',
          'ShiftLeft',
          'ShiftRight',
        ],
      }),
    )

    viewport.bounce({
      sides: 'all',
      friction: 0.5,
      ease: 'easeInOutSine',
      underflow: 'center',
      time: 80,
    })

    viewport.decelerate({
      friction: 0.9,
    })

    app.stage.addChild(viewport)

    viewport.scale.set(50 / PIXEL_SCALE, 50 / PIXEL_SCALE)
    viewport.moveCenter(WORLD.center.x, WORLD.center.y)

    return this
  }

  getScale() {
    return this.viewport.scale.x
  }

  resize(width: number, height: number) {
    this.viewport.resize(width, height)
    return this
  }
}
