import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { GLTF } from 'three-stdlib'
import { ObjectDisplayerProps } from './types'

const ModelLoader: React.FC<ObjectDisplayerProps> = ({ url }) => {
  const [model, setModel] = useState<GLTF>()
  const [zoom, setZoom] = useState<number>(0)
  const ref = useRef()
  // @ts-ignore
  console.log(url)
  const glb = useGLTF(url)
  const { camera } = useThree()

  useEffect(() => {
    console.log(glb)
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

  return <>{model && <primitive object={model.scene} ref={ref} dispose={null} />}</>
}

export default ModelLoader
