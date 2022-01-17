import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

import { Suspense, useEffect, useRef, useState } from 'react'
import { GLTF } from 'three-stdlib'
import style from './style.module.scss'

interface ObjectDisplayerProps {
  url: string
  withZoom?: boolean
  removeOrbit?: boolean
}

export const GLBModel: React.FC<ObjectDisplayerProps> = ({
  url,
  withZoom = false,
  removeOrbit
}) => {
  const [model, setModel] = useState<GLTF>()

  const ref = useRef()
  // @ts-ignore
  const glb = useGLTF(url)

  useEffect(() => {
    if (glb) {
      // Center Model
      const box = new THREE.Box3().setFromObject(glb.scene)
      const size = box.getSize(new THREE.Vector3()).length()
      const center = box.getCenter(new THREE.Vector3())
      const model = { ...glb }
      model.scene.position.x += model.scene.position.x - center.x
      model.scene.position.y = 0
      model.scene.position.z += model.scene.position.z - center.z
      setModel(model)
    }
  }, [glb])

  return (
    <>
      {model && <primitive object={model.scene} ref={ref} castShadow />}
      {!removeOrbit && (
        <OrbitControls
          screenSpacePanning={false}
          maxPolarAngle={Math.PI / 2}
          enableZoom={withZoom}
        />
      )}
    </>
  )
}

const ObjectDisplayer: React.FC<ObjectDisplayerProps> = props => {
  return (
    <Canvas className={style.canvas}>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <GLBModel {...props} />
      </Suspense>
      <gridHelper args={[1000, 750]} />
      <fog attach="fog" args={['#f0f0f0', 30, 200]} />
    </Canvas>
  )
}

export default ObjectDisplayer
