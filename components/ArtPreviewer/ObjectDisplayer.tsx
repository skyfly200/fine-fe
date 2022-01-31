import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

import { Suspense } from 'react'
import style from './style.module.scss'
import { ObjectDisplayerProps } from './types'
import ModelLoader from './ModelLoader'

const colors = {
  enviroment: '#FEFEFE',
  floor: '#FEFEFE'
}

interface GroundProps {
  groundColor: string
}

export const Ground = ({ groundColor }: GroundProps) => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <meshStandardMaterial attach="material" color={groundColor} />
    </mesh>
  )
}

const ObjectDisplayer: React.FC<ObjectDisplayerProps> = props => {
  return (
    <Canvas className={style.canvas} shadows>
      <fog attach="fog" args={[colors.enviroment, 30, 200]} />
      <color attach="background" args={[colors.enviroment]} />
      <spotLight position={[0, 80, -40]} angle={0.5} intensity={1} castShadow penumbra={0.3} />

      <Ground groundColor={colors.floor} />
      {props.url && (
        <Suspense fallback={null}>
          <ModelLoader {...props} />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>
      <OrbitControls
        screenSpacePanning={false}
        autoRotate
        maxPolarAngle={Math.PI / 2}
        enableZoom={props.withZoom}
      />
    </Canvas>
  )
}

export default ObjectDisplayer
