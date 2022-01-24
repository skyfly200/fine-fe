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
      // @ts-ignore
      Object.values(model.nodes).forEach(obj => Object.assign(obj, { castShadow: true }))
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

const ObjectDisplayer: React.FC<ObjectDisplayerProps> = props => {
  return (
    <Canvas className={style.canvas} shadows>
      <fog attach="fog" args={[colors.enviroment, 30, 200]} />
      <color attach="background" args={[colors.enviroment]} />
      <spotLight position={[10, 50, -40]} angle={0.5} intensity={1} castShadow penumbra={0.3} />

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
