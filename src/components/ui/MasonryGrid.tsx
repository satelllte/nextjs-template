import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import range from 'lodash.range'
import chunk from 'lodash.chunk'
import { useResize } from '../hooks'

export interface TileWithHeight<TileData> {
	height: number
  data: TileData
}

interface MasonryGridProps<TileData> {
	tiles: TileWithHeight<TileData>[]
	tileRenderer: (tile: TileWithHeight<TileData>) => React.ReactNode
	colWidth: number
	gapY?: number
	gapX?: number
}

export const MasonryGrid = <TileData extends unknown>({
	colWidth,
	gapY = 24,
	gapX = 16,
	tiles,
	tileRenderer,
}: MasonryGridProps<TileData>) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [colsCount, setColsCount] = useState<number>(0)

	const computeColsCount = useCallback(() => {
		if (!containerRef.current) { return 0 }

		const container = containerRef.current
		const containerBounds = container.getBoundingClientRect()
		const fullWidth = containerBounds.width
		const colsCount = calcColsCount(fullWidth, colWidth, gapX)

		return colsCount
	}, [colWidth, gapX])

	const updateColsCountIfNeeded = useCallback(() => {
		const newColsCount = computeColsCount()

		if (newColsCount !== colsCount) {
			setColsCount(newColsCount)
		}
	}, [computeColsCount, colsCount])

	useLayoutEffect(() => updateColsCountIfNeeded(), [updateColsCountIfNeeded])

	useResize(() => updateColsCountIfNeeded())

	const columnStyle = useMemo<React.CSSProperties>(() => ({
		width: colWidth,
		gap: gapY,
	}), [colWidth, gapY])

	const cols = useMemo(() => {
		return range(colsCount).map((colIndex) => {
			const indexes = calcColIndexes(colIndex, colsCount, tiles)
			
			return (
				<div key={colIndex} className='flex flex-col' style={columnStyle}>
					{indexes.map(index => {
						const tile = tiles[index]
						return (
							<React.Fragment key={index}>
								{tileRenderer(tile)}
							</React.Fragment>
						)
					})}
				</div>
			)
		})
	}, [columnStyle, colsCount, tiles, tileRenderer])

	const containerStyle = useMemo<React.CSSProperties>(() => ({
		columnGap: gapX,
	}), [gapX])
	
	return (
		<div
			ref={containerRef}
			style={containerStyle}
			className='flex justify-center'
		>
			{cols}
		</div>
	)
}

const calcColsCount = (
	fullWidth: number,
	colWidth: number,
	gap: number,
): number => {
	return Math.max(Math.floor(fullWidth / (colWidth + gap)), 1)
}

const calcColIndexes = <TileData extends unknown>(
	colIndex: number,
	colsCount: number,
	tiles: TileWithHeight<TileData>[]
): number[] => {
	if (!colsCount || !tiles.length) { return [] }

	const indexes: number[] = []

	const chunks = chunk(tiles, colsCount)

	chunks.forEach((chunkImages, chunkIndex) => {
		if (chunkImages[colIndex]) {
			indexes.push(colIndex + chunkIndex * colsCount)
		}
	})

	return indexes
}
