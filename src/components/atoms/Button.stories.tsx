import { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'
import { Button } from './Button'
import type { ButtonProps } from './types'

export default {
  title: 'atoms/Button',
  component: Button,
	args: {
		children: 'My Button',
	},
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {
	argTypes: {
		onClick: { action: true },
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement)
		const button = canvas.getByRole('button')

		await userEvent.click(button)
		await expect(args.onClick).toHaveBeenCalled()
	}
}
