import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import { usePlayerControls } from '../../utils'
import { useRef } from 'react'
import Camera from './Camera'
import PointerLockControls from './Camera'
const colors = {
  enviroment: '#FEFEFE',
  floor: '#CCC'
}

const Plane = () => {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    type: 'Static'
  }))
  return (
    <>
      <mesh ref={ref} scale={200} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeBufferGeometry />
        <meshStandardMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}
const SPEED = 5
function Marble() {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls()
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [2, 5, 0],
    type: 'Dynamic'
  }))
  const velocity = useRef([0, 0, 0])
  useFrame(state => {
    // @ts-ignore
    camera.position.copy(ref.current.position)

    const direction = new THREE.Vector3()
    const frontVector = new THREE.Vector3(0, 0, Number(moveBackward) - Number(moveForward))
    const sideVector = new THREE.Vector3(Number(moveLeft) - Number(moveRight), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)
    // @ts-ignore
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    // @ts-ignore
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      // @ts-ignore
      api.velocity.set(velocity.current[0], 10, velocity.current[2])
    }
  })
  return (
    <>
      <PointerLockControls />
      <mesh castShadow ref={ref}>
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]}></sphereBufferGeometry>
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  )
}

const FineVerse = () => {
  return (
    <Canvas shadows>
      <color attach="background" args={['#94ebd8']} />
      <fog attach="fog" args={['#94ebd8', 0, 40]} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.1} castShadow />
      <pointLight castShadow intensity={3} args={[0xff0000, 1, 100]} position={[-1, 3, 1]} />
      <spotLight
        castShadow
        intensity={1}
        args={['blue', 1, 100]}
        position={[-1, 4, -1]}
        penumbra={1}
      />
      <Camera />
      <Physics gravity={[0, -30, 0]}>
        <Plane />
        <Marble />
      </Physics>
    </Canvas>
  )
}

export default FineVerse
