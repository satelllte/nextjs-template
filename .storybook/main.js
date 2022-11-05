const path = require('path')

const webpackEnableAlias = (config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        '@': path.join(process.cwd(), 'src'),
      },
    },
  }
}

module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-postcss', // enables Tailwind in Storybook
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5'
	},
	features: {
    interactionsDebugger: true,
  },
	webpackFinal: (configuration) => webpackEnableAlias(configuration)
}
