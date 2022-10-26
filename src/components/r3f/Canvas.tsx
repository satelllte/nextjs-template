import { useEffect, useRef } from 'react'
import { Canvas as R3FCanvas, useFrame, useThree } from '@react-three/fiber'
import type { Mesh } from 'three'

const Box = () => {
	const meshRef = useRef<Mesh>(null!)

	useThree(state => {
		const camera = state.camera
		camera.position.set(-2.5, 0, 5)
		camera.lookAt(0, 0, 0)
	})

	useFrame((state) => {
		const time = state.clock.getElapsedTime()
		const camera = state.camera
		camera.position.y = Math.sin(time * Math.PI) * 0.1
	})

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowLeft':
					meshRef.current.position.x -= 0.1
					break
				case 'ArrowRight':
					meshRef.current.position.x += 0.1
					break
				case 'ArrowDown':
					meshRef.current.position.y -= 0.1
					break
				case 'ArrowUp':
					meshRef.current.position.y += 0.1
					break
			}
		}

		addEventListener('keydown', onKeyDown)

		return () => removeEventListener('keydown', onKeyDown)
	}, [])

	return (
		<mesh ref={meshRef}>
			<boxGeometry/>
			<meshStandardMaterial color='#ffffff'/>
		</mesh>
	)
}

export const Canvas = () => {
  return (
    <div className='fixed inset-0'>
      <R3FCanvas>
				<ambientLight color='#ffffff'/>
				<Box/>
			</R3FCanvas>
    </div>
  )
}
