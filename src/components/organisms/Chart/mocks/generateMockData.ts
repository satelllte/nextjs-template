import { randInt } from '@/utils/rand/randInt'
import type { DataSeries } from '../types'

export const generateMockData = (): DataSeries[] => {
	const linesCount = randInt(3, 5)
	const recordsCount = randInt(30, 31)

	return new Array(linesCount).fill(null).map((_, index) => {
		return {
			key: `Line ${index + 1}`,
			data: new Array(recordsCount).fill(null).map((_, index) => ({
				x: `2020-03-${index}`,
				y: randInt(-100, 200)
			})),
		}
	})
}
