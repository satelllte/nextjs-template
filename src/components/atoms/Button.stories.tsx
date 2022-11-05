import { Meta, StoryObj } from '@storybook/react'
import { resolveMetaTitle } from '@/utils/storybook/resolveMetaTitle'
import { Button } from './Button'
import type { ButtonProps } from './types'

export default {
  title: resolveMetaTitle('atoms', 'Button'),
  component: Button,
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {
	args: {
		children: 'My Button'
	}
}
