import { Meta, StoryObj } from '@storybook/react'
import { Disclosure } from './Disclosure'
import type { DisclosureProps } from './types'

export default {
  title: 'molecules/Disclosure',
  component: Disclosure,
	args: {
		name: 'My Disclosure',
		children: 'Content'
	},
} as Meta<DisclosureProps>

export const Primary: StoryObj<DisclosureProps> = {}
