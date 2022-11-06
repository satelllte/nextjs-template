import { describe, expect, it, vi } from 'vitest'
import { render, screen, userEvent } from '@/utils/vitest/test-utils'
import type { ButtonProps } from './types'
import { Button } from './Button'

describe('Button', () => {
	const renderComponent = (
		overrideProps: Omit<ButtonProps, 'children'> = {}
	) => {
		render(
			<Button {...overrideProps}>
				My Button
			</Button>
		)
	}

  it('renders inner content', () => {
		renderComponent()
		expect(screen.getByText(/My Button/)).toBeInTheDocument()
  })

	it('renders as "button" element', () => {
		renderComponent()
		expect(screen.getByRole('button')).toBeInTheDocument()
  })

	it('has [type="button"] attribute by default', () => {
		renderComponent()
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

	it('overrides "type" attribute if other given', () => {
		renderComponent({ type: 'submit' })
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

	it('fires "onClick" callback', async() => {
		const onClick = vi.fn().mockImplementation(() => {})
		renderComponent({ onClick })
		await userEvent.click(screen.getByRole('button'))
		expect(onClick).toHaveBeenCalledOnce()
  })
})
