import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Debug, Physics, useCylinder, usePlane } from '@react-three/cannon'
import type { CylinderArgs, CylinderProps, PlaneProps } from '@react-three/cannon'
import { Suspense } from 'react'

function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#171720" />
      </mesh>
    </group>
  )
}

const FineVerse = () => {
  return (
    <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
      <fog attach="fog" args={['#171720', 10, 50]} />
      <color attach="background" args={['#171720']} />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.5} intensity={1} castShadow penumbra={1} />

      <Physics
        broadphase="SAP"
        defaultContactMaterial={{ contactEquationRelaxation: 4, friction: 1e-3 }}
        allowSleep
      >
        <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
      </Physics>

      <OrbitControls />
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}

export default FineVerse
