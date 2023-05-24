import {
  getSpriteSheet,
  getSpriteUVsAsString,
  SpriteUVs,
} from 'src/utils/sprites'
import { useSpriteSheet } from 'src/context/SpriteSheetProvider'

export const useTextureFromUVs = (uvs: SpriteUVs) => {
  const spriteSheet = useSpriteSheet()
  const sprites = getSpriteSheet(spriteSheet.name)
  return `${sprites}?${getSpriteUVsAsString(uvs.w, uvs.h, uvs.u, uvs.v)}`
}
