import {
	describe,
	expect,
	test,
} from 'vitest'
import { calcDistribution } from './calcDistribution'

describe('calcDistribution', () => {
	test('returns empty array if no columns', () => {
		expect(calcDistribution(0, [100, 150, 200])).toEqual([])
		expect(calcDistribution(0, [100, 150])).toEqual([])
		expect(calcDistribution(0, [])).toEqual([])
	})

	test('returns array of empty columns if no tiles', () => {
		expect(calcDistribution(1, [])).toEqual([
			[],
		])

		expect(calcDistribution(2, [])).toEqual([
			[],
			[],
		])

		expect(calcDistribution(3, [])).toEqual([
			[],
			[],
			[],
		])
	})

	test('first row never shuffled', () => {
		expect(
			calcDistribution(2, [100, 150])
		).toEqual([
			[0],
			[1],
		])

		expect(
			calcDistribution(3, [100, 200, 150])
		).toEqual([
			[0],
			[1],
			[2],
		])
	})
 
	test('shuffling algorithm is correct', () => {
		expect(
			calcDistribution(2, [100, 200, 200, 100])
		).toEqual([
			[0, 2],
			[1, 3],
		])
		
		expect(
			calcDistribution(2, [100, 200, 100, 200])
		).toEqual([
			[0, 3],
			[1, 2],
		])

		expect(
			calcDistribution(3, [200, 200, 100, 200, 100])
		).toEqual([
			[0, 4],
			[1],
			[2, 3],
		])
	})
})
