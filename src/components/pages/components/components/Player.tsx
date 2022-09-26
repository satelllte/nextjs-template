import { useEffect, useRef, useState } from 'react'

interface PlayerProps {
	data: ArrayBuffer
}

export const Player: React.FC<PlayerProps> = ({
	data,
}) => {
	const [buffer, setBuffer] = useState<AudioBuffer>()
	const audioContextRef = useRef<AudioContext>()
	const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
	const [playing, setPlaying] = useState<boolean>(false)

	useEffect(() => {
		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext()
		}

		if (!data.byteLength) {
			return
		}

		;(async() => {
			if (!audioContextRef.current) {
				return
			}

			const audioContext = audioContextRef.current

			const buffer = await audioContext.decodeAudioData(data)
			setBuffer(buffer)
		})()
	}, [data])

	const play = () => {
		if (!audioContextRef.current || !buffer) {
			return
		}

		const audioContext = audioContextRef.current

		const loopStart = 25
		const loopDuration = 20

		const sourceNode = new AudioBufferSourceNode(audioContext, {
			buffer,
			loop: true,
			loopStart,
			loopEnd: loopStart + loopDuration,
		})
		sourceNode.connect(audioContext.destination)
		sourceNode.start(audioContext.currentTime, loopStart)
		sourceNodeRef.current = sourceNode
		setPlaying(true)
	}

	const stop = () => {
		if (!audioContextRef.current || !sourceNodeRef.current) {
			return
		}

		const audioContext = audioContextRef.current
		const sourceNode = sourceNodeRef.current

		sourceNode.stop(audioContext.currentTime)
		sourceNode.disconnect()

		sourceNodeRef.current = null
		setPlaying(false)
	}

	return (
		<div className=''>
			<button
				className='bg-sky-300/25 hover:bg-sky-300/50 p-4'
				onClick={playing ? stop : play}
				disabled={!buffer}
			>
				{!buffer && '...'}
				{buffer && (playing ? 'Stop' : 'Play')}
			</button>
		</div>
	)
}
