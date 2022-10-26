import { useRef } from 'react'
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const Box = () => {
	const meshRef = useRef<Mesh>(null!)

	useFrame((_, delta) => {
		meshRef.current.rotation.x += 0.75 * delta
		meshRef.current.rotation.y += 0.25 * delta
	})

	return (
		<mesh ref={meshRef}>
			<boxGeometry/>
			<meshStandardMaterial/>
		</mesh>
	)
}

export const Canvas = () => {
  return (
    <div className='fixed inset-0'>
      <R3FCanvas>
				<ambientLight intensity={1}/>
				<Box/>
			</R3FCanvas>
    </div>
  )
}
