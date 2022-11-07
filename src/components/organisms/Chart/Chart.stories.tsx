import { Meta, StoryObj } from '@storybook/react'
import { generateMockData } from './mocks/generateMockData'
import { Chart } from './Chart'
import type { ChartProps } from './types'

export default {
  title: 'organisms/Chart',
  component: Chart,
	args: {
		data: generateMockData()
	},
} as Meta<ChartProps>

export const Primary: StoryObj<ChartProps> = {}
