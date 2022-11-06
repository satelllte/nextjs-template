import { describe, expect, it } from 'vitest'
import { render, screen, userEvent } from '@/utils/vitest/test-utils'
import type { DisclosureProps } from './types'
import { Disclosure } from './Disclosure'

describe('Disclosure', () => {
	const renderComponent = (
		overrideProps: Omit<DisclosureProps, 'children' | 'name'> = {},
	) => {
		render(
			<Disclosure name='My Disclosure' {...overrideProps}>
				My Content
			</Disclosure>
		)
	}

  it('renders button name', () => {
		renderComponent()
		expect(screen.getByRole('button')).toHaveTextContent(/My Disclosure/)
  })

	it('collapsed by default', () => {
		renderComponent()
		expect(screen.getByRole('button', { expanded: false })).toBeInTheDocument()
		expect(screen.queryByText(/My Content/)).not.toBeInTheDocument()
  })

	it('expanded by default if [defaultExpanded = true]', () => {
		renderComponent({ defaultExpanded: true })
		expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument()
		expect(screen.queryByText(/My Content/)).toBeInTheDocument()
  })

	it('expands on click', async() => {
		renderComponent()
		await userEvent.click(screen.getByRole('button', { expanded: false }))
		expect(screen.queryByRole('button', { expanded: false })).not.toBeInTheDocument()
		expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument()
		expect(screen.queryByText(/My Content/)).toBeInTheDocument()
  })

	it('collapses on click', async() => {
		renderComponent({ defaultExpanded: true })
		await userEvent.click(screen.getByRole('button', { expanded: true }))
		expect(screen.queryByRole('button', { expanded: true })).not.toBeInTheDocument()
		expect(screen.getByRole('button', { expanded: false })).toBeInTheDocument()
		expect(screen.queryByText(/My Content/)).not.toBeInTheDocument()
  })
})
