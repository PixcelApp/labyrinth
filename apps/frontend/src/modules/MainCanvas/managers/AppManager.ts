import { Application, IApplicationOptions } from 'pixi.js'

export class AppManager {
  static options = {
    autoStart: true,
    hello: false,
    antialias: true,
    autoDensity: true,
    resolution: 2,
    backgroundAlpha: 0,
  } satisfies Partial<IApplicationOptions>

  public app: Application

  constructor() {
    this.app = new Application({
      ...AppManager.options,
    })
  }

  create(options: Partial<IApplicationOptions> = {}) {
    return this
  }

  setup() {
    return this
  }

  resize(width: number, height: number) {
    this.app.renderer.resize(width, height)
    return this
  }
}
