import {
	describe,
	expect,
	it,
} from 'vitest'
import { resolvePlaceholderUrl } from './resolvePlaceholderUrl'

describe('resolvePlaceholderUrl', () => {
	it('works properly for width, height arguments', () => {
		expect(resolvePlaceholderUrl(200, 100)).toEqual('https://via.placeholder.com/200x100')
		expect(resolvePlaceholderUrl(450, 900)).toEqual('https://via.placeholder.com/450x900')
	})

	it('works properly for color argument', () => {
		expect(resolvePlaceholderUrl(100, 200, '232323')).toEqual('https://via.placeholder.com/100x200/232323')
		expect(resolvePlaceholderUrl(600, 900, 'ff00ff')).toEqual('https://via.placeholder.com/600x900/ff00ff')
	})
})
