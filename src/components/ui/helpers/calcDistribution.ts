import chunk from 'lodash.chunk'

interface IndexedArrayItem<T> {
	index: number
	value: T
}

const getIndexedArray = <T>(arr: T[]): IndexedArrayItem<T>[] => {
	return arr.map((value, index) => ({ value, index }))
}

export const calcDistribution = (
	colsCount: number,
	tileHeights: number[]
): number[][] => {
	const distribution: number[][] = []
	for (let i = 0; i < colsCount; i++) { distribution.push([] as number[]) }

	const columns = (new Array(colsCount)).fill(0)
	
	chunk(tileHeights, colsCount).forEach((rowHeights, rowIndex) => {
		if (!rowIndex) {
			rowHeights.forEach((height, index) => {
				columns[index] += height
				distribution[index].push(index)
			})
			return
		}

		const rowHeightsIndexed = getIndexedArray(rowHeights)
		const rowHeightsIndexedSorted = [...rowHeightsIndexed].sort((a, b) => b.value - a.value)
		const columnsIndexed = getIndexedArray(columns)
		const columnsIndexedSorted = [...columnsIndexed].sort((a, b) => a.value - b.value)
		rowHeightsIndexedSorted.forEach((row, index) => {
			const columnIndex = columnsIndexedSorted[index].index
			columns[columnIndex] += row.value
			distribution[columnIndex].push(rowIndex * colsCount + row.index)
		})
	})

	return distribution
}
