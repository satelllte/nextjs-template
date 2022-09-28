const BASE_URL = 'https://via.placeholder.com'

export const resolvePlaceholderUrl = (
  width: number,
  height: number,
  color: string = '003377'
) => {
  return `${BASE_URL}/${width}x${height}/${color}`
}
