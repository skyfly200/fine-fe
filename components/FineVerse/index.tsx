import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Debug, Physics, useCylinder, usePlane } from '@react-three/cannon'
import type { CylinderArgs, CylinderProps, PlaneProps } from '@react-three/cannon'
import { Suspense } from 'react'
import { GLBModel } from '../ArtPreviewer/ObjectDisplayer'

const colors = {
  enviroment: '#EBC546',
  floor: '#EB7446'
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
    <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
      <fog attach="fog" args={[colors.enviroment, 40, 200]} />
      <color attach="background" args={[colors.enviroment]} />
      <ambientLight intensity={0.1} />
      <spotLight position={[20, 20, 20]} angle={0.5} intensity={1} castShadow penumbra={1} />

      <Physics
        broadphase="SAP"
        defaultContactMaterial={{ contactEquationRelaxation: 4, friction: 1e-3 }}
        allowSleep
      >
        <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
        <GLBModel url="/solids/1.glb" withZoom />
      </Physics>

      <Suspense fallback={null}>
        <Environment preset="dawn" />
      </Suspense>
    </Canvas>
  )
}

export default FineVerse
