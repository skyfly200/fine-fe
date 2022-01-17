import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Debug, Physics, usePlane } from '@react-three/cannon'
import type { PlaneProps } from '@react-three/cannon'
import { Suspense } from 'react'
import { GLBModel } from '../ArtPreviewer/ObjectDisplayer'
import Player from './Player'
import Camera from './Camera'
import Ground from './Ground'

const colors = {
  enviroment: '#FEFEFE',
  floor: '#CCC'
}

function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color={colors.floor} />
      </mesh>
    </group>
  )
}

const FineVerse = () => {
  return (
    <Canvas shadows gl={{ alpha: false }}>
      <fog attach="fog" args={[colors.enviroment, 40, 200]} />
      <color attach="background" args={[colors.enviroment]} />
      <ambientLight intensity={0.1} />
      <spotLight position={[20, 20, 20]} angle={0.5} intensity={1} castShadow penumbra={1} />

      <Camera />
      <Physics
        // broadphase="SAP"
        // defaultContactMaterial={{ contactEquationRelaxation: 4, friction: 1e-3 }}
        // allowSleep
        gravity={[0, -30, 0]}
      >
        <Debug color="black" scale={1.1}>
          <Ground />
          <Player />
          {/* <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} /> */}
          <GLBModel url="/solids/1.glb" removeOrbit />
        </Debug>
      </Physics>

      {/* <Suspense fallback={null}>
        <Environment preset="dawn" />
      </Suspense> */}
    </Canvas>
  )
}

export default FineVerse
