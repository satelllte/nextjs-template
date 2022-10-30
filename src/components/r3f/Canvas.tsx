import { Canvas as R3FCanvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, Debug, usePlane, useSphere, useBox } from '@react-three/cannon'
import type { Triplet } from '@react-three/cannon'
import type { Mesh } from 'three'

const Paddle = () => {
	const mainBoxArgs: Triplet = [1, 0.05, 1.2]
	const [paddlePhysRef] = useBox<Mesh>(() => ({
		type: 'Kinematic',
		args: mainBoxArgs,
	}))

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
