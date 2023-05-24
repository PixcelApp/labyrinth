export const getImageSize = async (path: string) => {
  const image = await createImageBitmap(await fetch(path).then((r) => r.blob()))
  return image.width
}
