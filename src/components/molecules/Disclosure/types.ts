export interface DisclosureProps {
	/**
	 * Disclosure button text
	 */
	name: string
	/**
	 * Content to expand/collapse
	 */
	children: React.ReactNode
	/**
	 * Defines if content expanded by default
	 */
	defaultExpanded?: boolean
}
