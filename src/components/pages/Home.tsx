import { fetchImages, fetchImagesWithSizes } from '@/api'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import type { TileWithHeight } from '@/components/ui/MasonryGrid'
import { useCallback, useEffect, useState } from 'react'
import type { Dimensions } from '@/utils/image/getRemoteImageDimensions'
import { getRemoteImageDimensions } from '@/utils/image/getRemoteImageDimensions'

const CHUNK_SIZE = 12

const colWidth = 275

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

const fetchTilesPro = async(): Promise<Tile[]> => {
	const urls = await fetchImages(CHUNK_SIZE)
	const promises: Promise<Dimensions>[] = urls.map(url => {
		return new Promise((resolve) => getRemoteImageDimensions(url).then(dimensions => resolve(dimensions)))
	})
	return await Promise.all(promises)
		.then(dimensions => dimensions.map((dimension, i) => {
			const { height: originalHeight, width: originalWidth } = dimension
			const height = (colWidth / originalWidth) * originalHeight
			return {
				data: { src: urls[i] },
				height,
			}
		}))
}

export const Home = () => {
	const [tiles, setTiles] = useState<Tile[]>([])

	const fetchFirst = useCallback(async() => {
		setTiles(await fetchTilesPro())
	}, [])

	const fetchMore = useCallback(async() => {
		const newTiles = await fetchTilesPro()
		setTiles(existingTiles => [...existingTiles, ...newTiles])
	}, [])

	useEffect(() => {
		fetchFirst()
		return () => setTiles([])
	}, [fetchFirst])

	const tileRenderer = useCallback((tile: Tile) => {
		console.info('tile: ', tile)
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
						colWidth={colWidth}
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
