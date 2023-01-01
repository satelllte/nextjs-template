export type ButtonRef = HTMLButtonElement

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Content to show inside the button
	 */
	children: React.ReactNode
}
