import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonProps } from './types'

export default {
  title: 'atoms/Button',
  component: Button,
	args: {
		children: 'My Button',
	},
} satisfies Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {}
