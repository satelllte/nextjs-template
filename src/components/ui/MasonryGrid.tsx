import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import range from 'lodash.range'
import chunk from 'lodash.chunk'
import { useResize } from '../hooks'

type ImageWithSize = {
	src: string,
	width: number,
	height: number
}

interface MasonryGridProps {
	colWidth: number
	gapY?: number
	gapX?: number
	images: ImageWithSize[]
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
	colWidth,
	gapY = 24,
	gapX = 16,
	images,
}) => {
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

	const columnStyle: React.CSSProperties = useMemo(() => ({
		width: colWidth,
		gap: gapY,
	}), [colWidth, gapY])

	const cols = useMemo(() => {
		return range(colsCount).map((colIndex) => {
			const indexes = calcColIndexes(colIndex, colsCount, images)
			
			return (
				<div key={colIndex} className='flex flex-col' style={columnStyle}>
					{indexes.map(index => {
						const image = images[index]
						return (
							// eslint-disable-next-line @next/next/no-img-element
							<img key={index} src={image.src} alt={'alt'}/>
						)
					})}
				</div>
			)
		})
	}, [columnStyle, colsCount, images])

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
			{/* <div style={columnStyle}></div> */}
			{/* {images.map(image => {
				return (
					<div key={image.src}>
						{image.src}
					</div>
				)
			})} */}
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

const calcColIndexes = (
	colIndex: number,
	colsCount: number,
	images: ImageWithSize[]
): number[] => {
	if (!colsCount || !images.length) { return [] }

	const indexes: number[] = []

	const chunks = chunk(images, colsCount)

	chunks.forEach((chunkImages, chunkIndex) => {
		if (chunkImages[colIndex]) {
			indexes.push(colIndex + chunkIndex * colsCount)
		}
	})

	return indexes
}
