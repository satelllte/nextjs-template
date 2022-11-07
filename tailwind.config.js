/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
			keyframes: {
        ['radix-accordion-open']: {
          'from': { height: 0 },
          'to': { height: 'var(--radix-accordion-content-height)' },
        },
        ['radix-accordion-close']: {
					'from': { height: 'var(--radix-accordion-content-height)' },
          'to': { height: 0 },
        },
      },
			animation: {
				['radix-accordion-open']: 'radix-accordion-open 300ms ease-out',
				['radix-accordion-close']: 'radix-accordion-close 300ms ease-out',
			},
		},
  },
  plugins: [],
}
