import {
	describe,
	expect,
	it,
} from 'vitest'
import { randInt } from './randInt'

const REPEAT_COUNT = 10

describe('randInt', () => {
	const repeat = (fn: () => void) => {
		for (let i = 0; i < REPEAT_COUNT; i++) {
			fn()
		}
	}

	const testRange = (min: number, max: number) => {
		repeat(() => {
			const result = randInt(min, max)
			expect(result).toBeGreaterThanOrEqual(min)
			expect(result).toBeLessThanOrEqual(max)
			expect(Number.isInteger(result)).toEqual(true)
		})
	}

	it('works', () => {
		testRange(-1, 1)
		testRange(-10, -5)
		testRange(0, 3)
		testRange(1000, 1050)
	})
})
