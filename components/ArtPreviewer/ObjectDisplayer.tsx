import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

import { SetStateAction, Suspense, useEffect, useRef, useState } from 'react'
import { GLTF } from 'three-stdlib'

interface ObjectDisplayerProps {
  url: string
}

const Model: React.FC<ObjectDisplayerProps> = ({ url }) => {
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
      model.scene.position.y += model.scene.position.y - center.y
      model.scene.position.z += model.scene.position.z - center.z
      setModel(model)
      setZoom(size)
    }
  }, [glb])

  useEffect(() => {
    console.log('test')
    camera.position.z = zoom
  }, [camera, zoom])
  return (
    <>
      {model && <primitive object={model.scene} ref={ref} />}
      <OrbitControls autoRotate screenSpacePanning maxZoom={45} />
    </>
  )
}

const ObjectDisplayer: React.FC<ObjectDisplayerProps> = ({ url }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
    </Canvas>
  )
}

export default ObjectDisplayer
