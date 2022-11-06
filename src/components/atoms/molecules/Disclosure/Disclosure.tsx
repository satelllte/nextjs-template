import { useId, useState } from 'react'
import { Button } from '@/components/atoms/Button'
import type { DisclosureProps } from './types'

export const Disclosure = ({
	name,
	children
}: DisclosureProps) => {
	const id = useId()
	const [expanded, setExpanded] = useState<boolean>(false)

	const toggle = () => setExpanded(expanded => !expanded)

	return (
		<>
			<Button
				aria-controls={id}
				aria-expanded={expanded}
				onClick={toggle}
			>
				{name}
			</Button>
			<div
				id={id}
				className={expanded ? '' : 'hidden'}
			>
				{children}
			</div>
		</>
	)
}
