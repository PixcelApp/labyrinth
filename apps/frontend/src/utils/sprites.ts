export type SpriteUVs = {
  w: number
  h: number
  u: number
  v: number
}

export function getSpriteUVs(size: number): SpriteUVs
export function getSpriteUVs(size: number, u: number, v: number): SpriteUVs
export function getSpriteUVs(
  w: number,
  h: number,
  u: number,
  v: number,
): SpriteUVs

export function getSpriteUVs(a: number, b?: number, c?: number, d?: number) {
  const w = a
  const h = (typeof d === 'number' ? b : a) ?? w
  const u = (typeof d === 'number' ? c : b) ?? 0
  const v = (typeof d === 'number' ? d : c) ?? 0

  return {
    w,
    h,
    u,
    v,
  } as const
}

export const getSpriteUVsAsString = (
  a: number,
  b?: number,
  c?: number,
  d?: number,
) => {
  const { w, h, u, v } =
    typeof b === 'number' && typeof c === 'number' && typeof d === 'number'
      ? getSpriteUVs(a, b, c, d)
      : typeof b === 'number' && typeof c === 'number'
      ? getSpriteUVs(a, b, c)
      : getSpriteUVs(a)

  const data = new URLSearchParams()

  data.append('u', u.toString())
  data.append('v', v.toString())
  data.append('w', w.toString())
  data.append('h', h.toString())

  return data.toString()
}

export const getSpriteSheet = (theme: string) => `/themes/${theme}/sprites.png`
