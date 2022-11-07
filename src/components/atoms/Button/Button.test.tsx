import { describe, expect, it, vi } from 'vitest'
import { render, screen, userEvent } from '@/utils/vitest/test-utils'
import { isDOMComponent } from 'react-dom/test-utils'
import { createRef } from 'react'
import type { ButtonProps } from './types'
import { Button } from './Button'

describe('Button', () => {
	const renderComponent = (
		overrideProps: Omit<ButtonProps, 'children'> = {},
		ref: React.RefObject<HTMLButtonElement> = createRef()
	) => {
		render(
			<Button ref={ref} {...overrideProps}>
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

	it('forwards ref', async() => {
		const ref = createRef<HTMLButtonElement>()
		renderComponent({}, ref)
		expect(ref.current).toBeDefined()
		expect(isDOMComponent(ref.current as HTMLButtonElement)).toEqual(true)
  })
})
