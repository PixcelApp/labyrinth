import { EventEmitter } from 'src/utils/EventEmitter'
import { Application } from 'pixi.js'

export enum FrameManagerEvent {
  RENDER = 'render',
}

export type FrameManagerEvents = {
  [FrameManagerEvent.RENDER]: []
}

export class FrameManager extends EventEmitter<FrameManagerEvents> {
  fps = 8

  private cancelled = false

  private fpsInterval = 0
  private startTime = 0
  private now = 0
  private then = 0
  private elapsed = 0

  constructor(private app: Application) {
    super()
  }

  private onFrame() {
    if (this.cancelled) {
      return this.stop()
    }

    this.now = Date.now()
    this.elapsed = this.now - this.then

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval)

      this.emit(FrameManagerEvent.RENDER)
    }
  }

  start() {
    this.cancelled = false

    this.fpsInterval = 1000 / this.fps
    this.then = Date.now()
    this.startTime = this.then

    this.app.ticker.add(this.onFrame.bind(this))
  }

  stop() {
    this.cancelled = false
    this.app.ticker.remove(this.onFrame.bind(this))
  }
}
