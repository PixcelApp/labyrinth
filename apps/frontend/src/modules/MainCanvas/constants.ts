export const PIXEL_SCALE = 32 // this allows for grid lines when zoomed in
export const WORLD_WIDTH = 20000 * PIXEL_SCALE
export const WORLD_HEIGHT = 20000 * PIXEL_SCALE
export const PROJECT_WIDTH = 6000 * PIXEL_SCALE
export const PROJECT_HEIGHT = 6000 * PIXEL_SCALE

export const WORLD = {
  x: 0,
  y: 0,
  width: WORLD_WIDTH,
  height: WORLD_HEIGHT,
  center: {
    x: WORLD_WIDTH / 2,
    y: WORLD_HEIGHT / 2,
  },
}

export const PROJECT = {
  x: WORLD.center.x - PROJECT_WIDTH / 2,
  y: WORLD.center.y - PROJECT_HEIGHT / 2,
  width: PROJECT_WIDTH,
  height: PROJECT_HEIGHT,
  center: {
    x: WORLD.center.x,
    y: WORLD.center.y,
  },
}
