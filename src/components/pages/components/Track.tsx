import { useState } from 'react'
import { Player } from './components'

const AUDIO_URL = '/audio/vue-enemy.mp3'

export const Track = () => {
	const [fileArrayBuffer, setFileArrayBuffer] = useState<ArrayBuffer>()
	const [fileLoading, setFileLoading] = useState<boolean>(false)

	const loadFile = async() => {
		setFileLoading(true)
		const response = await fetch(AUDIO_URL)
		const arrayBuffer = await response.arrayBuffer()
		setFileArrayBuffer(arrayBuffer)
		setFileLoading(false)
	}

	console.info('fileLoading | fileArrayBuffer: ', fileLoading, fileArrayBuffer)

	return (
		<div className='bg-gray-100 p-4 mb-4 flex justify-center'>
			{!fileArrayBuffer && <button
				className='bg-sky-300/25 hover:bg-sky-300/50 p-4'
				onClick={loadFile}
				disabled={fileLoading}
			>
				{fileLoading ? `Loading "${AUDIO_URL}" file ...` : `Load "${AUDIO_URL}" file`}
			</button>}
			{fileArrayBuffer && (
				<Player data={fileArrayBuffer}/>
			)}
		</div>
	)
}
