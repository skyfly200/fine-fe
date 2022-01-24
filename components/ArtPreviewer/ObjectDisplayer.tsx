import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { GLTF } from 'three-stdlib'
import style from './style.module.scss'

interface ObjectDisplayerProps {
  url: string
  withZoom?: boolean
}

const colors = {
  enviroment: '#FEFEFE',
  floor: '#FEFEFE'
}

const Ground = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <meshStandardMaterial attach="material" color={colors.floor} />
    </mesh>
  )
}
const Model: React.FC<ObjectDisplayerProps> = ({ url, withZoom = false }) => {
  const [model, setModel] = useState<GLTF>()
  const [zoom, setZoom] = useState<number>(0)
  const ref = useRef()
  // @ts-ignore
  const glb = useGLTF(url)
  const { camera } = useThree()

  useEffect(() => {
    if (glb) {
      // Center Model
      const box = new THREE.Box3().setFromObject(glb.scene)
      const size = box.getSize(new THREE.Vector3()).length()
      const center = box.getCenter(new THREE.Vector3())
      const model = { ...glb }
      model.scene.position.x += model.scene.position.x - center.x
      model.scene.position.y = 0.01 // avoid blinking
      model.scene.position.z += model.scene.position.z - center.z
      setModel(model)
      setZoom(size)
    }
  }, [glb])

  useEffect(() => {
    camera.position.z = zoom
    camera.position.y = 10
  }, [camera, zoom])

  return (
    <>
      {model && <primitive object={model.scene} ref={ref} dispose={null} />}

      <OrbitControls screenSpacePanning={false} maxPolarAngle={Math.PI / 2} enableZoom={withZoom} />
    </>
  )
}

function Model2({ ...props }: ObjectDisplayerProps) {
  const group = useRef()
  // @ts-ignore
  const { nodes, materials } = useGLTF('/solids/1.glb')
  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group scale={100}>
          <mesh
            geometry={nodes.Ramps.geometry}
            material={nodes.Ramps.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Ramps_2.geometry}
            material={nodes.Ramps_2.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Solids.geometry}
            material={materials['1 (4)']}
            castShadow
            receiveShadow
          />
        </group>
      </group>
      <OrbitControls
        screenSpacePanning={false}
        maxPolarAngle={Math.PI / 2}
        enableZoom={props.withZoom}
      />
    </>
  )
}

const ObjectDisplayer: React.FC<ObjectDisplayerProps> = props => {
  return (
    <Canvas className={style.canvas}>
      <fog attach="fog" args={[colors.enviroment, 30, 200]} />
      <color attach="background" args={[colors.enviroment]} />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 30, -50]} angle={0.5} intensity={1} castShadow penumbra={1} />

      <Ground />
      <Suspense fallback={null}>
        <Model {...props} />
      </Suspense>
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  )
}

export default ObjectDisplayer
