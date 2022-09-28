import type { ImageWithSize } from '@/api'
import { fetchImagesWithSizes } from '@/api'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { useCallback, useEffect, useState } from 'react'

export const Home = () => {
	const [images, setImages] = useState<ImageWithSize[]>([])

	const fetchNewData = useCallback(async() => {
		setImages(await fetchImagesWithSizes(10))
	}, [])

	useEffect(() => {
		fetchNewData()
	}, [fetchNewData])

	return (
		<div>
			<header className='py-4 mb-4 bg-gray-200 text-center'>Header</header>
			<button onClick={fetchNewData}>Fetch new data</button>
			<div className='m-4'>
				{images.length ? <MasonryGrid images={images}/> : null}
			</div>
		</div>
	)
}
