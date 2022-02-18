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

const ObjectDisplayer: React.FC<ObjectDisplayerProps> = ({
  activeColor = '#FEFEFE',
  fogOn,
  spotlightOn,
  withGround,
  ...props
}) => {
  return (
    <Canvas className={style.canvas} shadows>
      <color attach="background" args={[activeColor]} />
      {fogOn && <fog attach="fog" args={[activeColor, 30, 200]} />}
      {spotlightOn && (
        <spotLight position={[0, 80, -40]} angle={0.5} intensity={0.5} castShadow penumbra={0.3} />
      )}
      <ambientLight position={[0, 80, -40]} intensity={0.5} />
      {withGround && <Ground groundColor={activeColor} />}
      {props.url && (
        <Suspense fallback={null}>
          <ModelLoader {...props} />
        </Suspense>
      )}

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
