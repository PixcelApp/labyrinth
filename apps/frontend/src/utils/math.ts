export const clamp = (
  value: number,
  min: number,
  max: number,
  toMin?: number,
  toMax?: number,
) => {
  if (toMin === undefined) toMin = min
  if (toMax === undefined) toMax = max
  return ((value - min) * (toMax - toMin)) / (max - min) + toMin
}
