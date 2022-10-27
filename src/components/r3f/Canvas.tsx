import { useEffect, useRef } from 'react'
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber'
import { Physics, Debug, usePlane, useSphere } from '@react-three/cannon'
import type { Triplet } from '@react-three/cannon'
import type { Mesh } from 'three'

const Plane = () => {
	const [planePhysRef] = usePlane<Mesh>(() => ({
		rotation: [-Math.PI / 2, 0, 0],
	}))
  return (
    <mesh ref={planePhysRef}>
      <planeGeometry args={[10, 10]} />
    </mesh>
  )
}

const Ball = () => {
  const [ballPhysRef, api] = useSphere<Mesh>(() => ({
		mass: 1,
		position: [0, 5, 0],
		rotation: [0, 0, 0],
		material: {
			friction: 0.1,
			restitution: 0.82
		}
	}))
	const positionRef = useRef<Triplet>([0, 0, 0])

	useEffect(() => {
		const unsubscribe = api.position.subscribe(v => positionRef.current = v)
		return unsubscribe
	}, [api])

	useFrame(({ camera }) => {
		const position = positionRef.current
		camera.lookAt(...position)
	})

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const position = positionRef.current

			switch (event.key) {
				case 'ArrowLeft':
					api.applyImpulse([-1,0,0], position)
					break
				case 'ArrowRight':
					api.applyImpulse([1,0,0], position)
					break
				case 'ArrowDown':
					api.applyImpulse([0,0,1], position)
					break
				case 'ArrowUp':
					api.applyImpulse([0,0,-1], position)
					break
				case ' ':
					api.applyImpulse([0,5,0], position)
					break
			}
		}

		addEventListener('keydown', onKeyDown)

		return () => removeEventListener('keydown', onKeyDown)
	}, [api])

	return (
    <mesh ref={ballPhysRef}>
      <sphereGeometry />
			<meshStandardMaterial color='#ff0000'/>
    </mesh>
  )
}

export const Canvas = () => {
  return (
    <div className='fixed inset-0'>
      <R3FCanvas camera={{ position: [-1, 5, 5] }}>
				<ambientLight/>
				<Physics>
					<Debug color='green' scale={1.1}>
						<Plane/>
						<Ball/>
					</Debug>
				</Physics>
			</R3FCanvas>
    </div>
  )
}
