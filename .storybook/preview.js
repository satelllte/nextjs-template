// enables Tailwind in Storybook
import '../src/styles/index.css'

export const parameters = {
	layout: 'centered', // https://storybook.js.org/docs/react/configure/story-layout#global-layout
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}
