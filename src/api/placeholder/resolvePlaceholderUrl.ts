import { PLACEHOLDER_BASE_URL } from './constants'

export const resolvePlaceholderUrl = (
  width: number,
  height: number,
  color?: string
) => {
  return `${PLACEHOLDER_BASE_URL}/${width}x${height}${color ? `/${color}` : ''}`
}
