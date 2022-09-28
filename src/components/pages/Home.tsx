import type { ImageWithSize } from '@/api'
import { fetchImagesWithSizes } from '@/api'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { useCallback, useEffect, useState } from 'react'

const CHUNK_SIZE = 11

export const Home = () => {
	const [images, setImages] = useState<ImageWithSize[]>([])

	const fetchFirst = useCallback(async() => {
		const images = await fetchImagesWithSizes(CHUNK_SIZE) // TODO: calculate width of images from URL
		setImages(images)
	}, [])

	const fetchMore = useCallback(async() => {
		const newImages = await fetchImagesWithSizes(CHUNK_SIZE) // TODO: calculate width of images from URL
		setImages(existingImages => [...existingImages, ...newImages])
	}, [])

	useEffect(() => {
		fetchFirst()
		return () => setImages([])
	}, [fetchFirst])

	return (
		<div>
			<header className='py-4 mb-4 bg-gray-200 text-center'>Header</header>
			<div className='m-4'>
				{!images.length ? null : (
					<MasonryGrid
						images={images}
						colWidth={320}
					/>
				)}
			</div>
			<button
				className='my-4 mx-auto block py-4 px-8 bg-slate-100 border border-cyan-500'
				onClick={fetchMore}
			>
				Load More
			</button>
		</div>
	)
}
