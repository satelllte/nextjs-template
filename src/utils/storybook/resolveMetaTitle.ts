/**
 * Resolves the story meta title string by given path
 * More info: https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy
 */
 export const resolveMetaTitle = (...path: string[]): string => {
	return path.join('/')
}
