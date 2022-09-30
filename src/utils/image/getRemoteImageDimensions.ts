export interface Dimensions {
	width: number
	height: number
}

export const getRemoteImageDimensions = (url: string): Promise<Dimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({
      width: img.naturalWidth,
      height: img.naturalHeight,
    })
    img.onerror = (error) => reject(error)
    img.src = url
  })
}
