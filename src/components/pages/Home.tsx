import { fetchImagesWithSizes } from '@/api'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import type { TileWithHeight } from '@/components/ui/MasonryGrid'
import { useCallback, useEffect, useState } from 'react'

const CHUNK_SIZE = 11

interface TileData {
	src: string
}

interface Tile extends TileWithHeight<TileData> {}

const fetchTiles = async (): Promise<Tile[]> => {
	const images = await fetchImagesWithSizes(CHUNK_SIZE) // TODO: calculate width of images from URL
	return images.map((image) => {
		const height = image.height
		const data: TileData = { 
			src: image.src
		}
		return {
			height,
			data,
		}
	})
}

export const Home = () => {
	const [tiles, setTiles] = useState<Tile[]>([])

	const fetchFirst = useCallback(async() => {
		setTiles(await fetchTiles())
	}, [])

	const fetchMore = useCallback(async() => {
		const newTiles = await fetchTiles()
		setTiles(existingTiles => [...existingTiles, ...newTiles])
	}, [])

	useEffect(() => {
		fetchFirst()
		return () => setTiles([])
	}, [fetchFirst])

	const tileRenderer = useCallback((tile: Tile) => {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img src={tile.data.src} alt={'alt'}/>
		)
	}, [])

	return (
		<div>
			<header className='py-4 mb-4 bg-gray-200 text-center'>Header</header>
			<div className='m-4'>
				{!tiles.length ? <div>...</div> : (
					<MasonryGrid
						tiles={tiles}
						tileRenderer={tileRenderer}
						colWidth={275}
						gapX={12}
						gapY={16}
					/>
				)}
			</div>
			{!tiles.length ? null : (
				<button
					className='my-4 mx-auto block py-4 px-8 bg-slate-100 border border-cyan-500'
					onClick={fetchMore}
				>
					Load More
				</button>
			)}
		</div>
	)
}
