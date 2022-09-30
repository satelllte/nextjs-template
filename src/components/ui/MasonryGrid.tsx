import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useResize } from '../hooks'
import { calcDistribution } from './helpers/calcDistribution'

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
	tiles,
	tileRenderer,
	colWidth,
	gapY = 24,
	gapX = 16,
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
		const distribution = calcDistribution(
			colsCount,
			tiles.map(({ height }) => height)
		)

		return distribution.map((tileIndexes, colIndex) => {
			return (
				<div key={colIndex} className='flex flex-col' style={columnStyle}>
					{tileIndexes.map(tileIndex => {
						const tile = tiles[tileIndex]
						return (
							<React.Fragment key={tileIndex}>
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
