import { useEffect, useRef } from 'react'
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, Debug, usePlane, useSphere, useBox } from '@react-three/cannon'
import type { Triplet } from '@react-three/cannon'
import { Mesh } from 'three'
import {
	ARROW_LEFT,
	ARROW_RIGHT,
	ARROW_UP,
	ARROW_DOWN,
} from '@/constants/keyboardEventCodes'

const Paddle = () => {
	const mainBoxArgs: Triplet = [1, 0.05, 1.2]
	const [paddlePhysRef, physApi] = useBox<Mesh>(() => ({
		type: 'Kinematic',
		args: mainBoxArgs,
	}))

	const positionRef = useRef<Triplet>([0, 0, 0])
	const velocityRef = useRef<Triplet>([0, 0, 0])

	useEffect(() => {
		const unsubscribe = physApi.position.subscribe(position => positionRef.current = position)
		return unsubscribe
	}, [physApi])

	useEffect(() => {
		const unsubscribe = physApi.velocity.subscribe(velocity => velocityRef.current = velocity)
		return unsubscribe
	}, [physApi])

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			console.info('onKeyDown | event.code: ', event.code)

			let inputX: number = 0
			let inputY: number = 0

			switch (event.code) {
				case ARROW_LEFT:
					inputX = -1
					break
				case ARROW_RIGHT:
					inputX = 1
					break
				case ARROW_UP:
					inputY = 1
					break
				case ARROW_DOWN:
					inputY = -1
					break
			}

			const [x, y, z] = velocityRef.current
			const speed = 7.5
			physApi.velocity.set(x + inputX * speed, y + inputY * speed, z)
		}

		addEventListener('keydown', onKeyDown)

		return () => {
			removeEventListener('keydown', onKeyDown)
		}
	}, [physApi])

	useFrame(() => {
		const damping = 0.5
		const [x, y, z] = velocityRef.current
		physApi.velocity.set(x * damping, y * damping, z * damping)
	})

	return (
		<mesh ref={paddlePhysRef}>
			<group>
				<mesh>
					<boxGeometry args={mainBoxArgs}/>
					<meshStandardMaterial color='red'/>
				</mesh>
				<mesh position={[0, 0, 0.85]}>
					<boxGeometry args={[0.25, 0.05, 0.5]}/>
					<meshStandardMaterial color='blue'/>
				</mesh>
			</group>
		</mesh>
	)
}

const Ball = () => {
	const radius = 0.2
  const [spherePhysRef, physApi] = useSphere<Mesh>(() => ({
		mass: 0.25,
		args: [radius],
		position: [0, 5, 0],
	}))

	usePlane(() => ({
    type: 'Static',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    onCollide: () => {
      physApi.position.set(0, 5, 0)
      physApi.velocity.set(0, 5, 0)
			physApi.rotation.set(0, 0, 0)
    },
  }))

  return (
    <mesh castShadow ref={spherePhysRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial/>
    </mesh>
  )
}

export const Canvas = () => {
  return (
    <div className='fixed inset-0'>
      <R3FCanvas camera={{ position: [0, 5, 8] }}>
				<ambientLight/>
				<OrbitControls/>
				<Physics
					defaultContactMaterial={{
						friction: 0.9,
						restitution: 0.7,
						contactEquationStiffness: 1e7,
						contactEquationRelaxation: 1,
						frictionEquationStiffness: 1e7,
						frictionEquationRelaxation: 2,
					}}
				>
					<Debug color='green' scale={1.1}>
						<Ball/>
						<Paddle/>
					</Debug>
				</Physics>
			</R3FCanvas>
    </div>
  )
}
