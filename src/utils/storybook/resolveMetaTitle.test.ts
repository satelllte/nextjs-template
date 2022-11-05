import {
	describe,
	expect,
	it,
} from 'vitest'
import { resolveMetaTitle } from './resolveMetaTitle'

describe('resolveMetaTitle', () => {
	it('works for a single level', () => {
		expect(resolveMetaTitle('Hi')).toEqual('Hi')
	})

	it('concats two levels with `/` separator', () => {
		expect(resolveMetaTitle('atoms', 'Button')).toEqual('atoms/Button')
		expect(resolveMetaTitle('atoms', 'Text')).toEqual('atoms/Text')
		expect(resolveMetaTitle('molecules', 'SearchBar')).toEqual('molecules/SearchBar')
	})

	it('concats three and more levels with `/` separator', () => {
		expect(resolveMetaTitle('docs', 'other', 'Scraping')).toEqual('docs/other/Scraping')
		expect(resolveMetaTitle('docs', 'other', 'Useful Links', 'Web 3.0')).toEqual('docs/other/Useful Links/Web 3.0')
	})

	it('does not do anything with spaces, letter case, etc.', () => {
		expect(resolveMetaTitle('docs', 'Atomic Design')).toEqual('docs/Atomic Design')
		expect(resolveMetaTitle('docs', 'Atomic Design and More')).toEqual('docs/Atomic Design and More')
		expect(resolveMetaTitle('docs', 'Atomic Design and More', 'Sign Up for the Journey')).toEqual('docs/Atomic Design and More/Sign Up for the Journey')
	})
})
