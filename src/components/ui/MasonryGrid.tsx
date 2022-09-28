import { useCallback, useRef } from 'react'
import type { CellRenderer } from 'react-virtualized'
import { WindowScroller, AutoSizer, CellMeasurer, CellMeasurerCache, Masonry, createMasonryCellPositioner } from 'react-virtualized'

const columnWidth = 320
const defaultWidth = columnWidth
const defaultHeight = 250

type ImageWithSize = {
	src: string,
	width: number,
	height: number
}

interface MasonryGridProps {
	images: ImageWithSize[]
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
	images,
}) => {
	const cellMeasurerCacheRef = useRef(new CellMeasurerCache({
		defaultHeight,
		defaultWidth,
		fixedWidth: true,
	}))

	const cellPositionerRef = useRef(createMasonryCellPositioner({
		cellMeasurerCache: cellMeasurerCacheRef.current,
		columnCount: 2,
		columnWidth,
		spacer: 10,
	}))

	const cellRenderer = useCallback<CellRenderer>(({
		index, // Index of item within the collection
		isScrolling, // The Grid is currently being scrolled
		key, // Unique key within array of cells
		parent, // Reference to the parent Grid (instance)
		style, // Style object to be applied to cell (to position it)
	}) => {
		const item = images[index]
    const height = columnWidth * (item.height / item.width) || defaultHeight
		return (
			<CellMeasurer
				cache={cellMeasurerCacheRef.current}
				index={index}
				key={key}
				parent={parent}>
				<div style={style}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						alt='image'
						src={item.src}
						style={{
              height: height,
              width: columnWidth,
            }}
					/>
				</div>
			</CellMeasurer>
		) as React.ReactNode
	}, [images])

	return (
		<Masonry
			// autoHeight		
			width={800}
			height={600}
			cellCount={images.length}
			cellMeasurerCache={cellMeasurerCacheRef.current}
			cellPositioner={cellPositionerRef.current}
			cellRenderer={cellRenderer}
		/>
	)
}
