import { forwardRef } from 'react'
import type { ButtonRef, ButtonProps } from './types'

export const Button = forwardRef<ButtonRef, ButtonProps>(({
	children,
	type,
	...rest
}, ref) => {
	return (
		<button
			ref={ref}
			type={type || 'button'}
			className='bg-red-500' // just some dumb Tailwind style for Storybook testing
			{...rest}
		>
			{children}
		</button>
	)
})

Button.displayName = 'Button'
