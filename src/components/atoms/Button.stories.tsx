import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonProps } from './types'

export default {
  title: 'atoms/Button',
  component: Button,
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {
	args: {
		children: 'My Button'
	}
}
