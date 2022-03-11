import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
const Model = dynamic(() => import('../components/ArtPreviewer/ObjectDisplayer'), {
  ssr: false
})

const Test = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 'calc(var(--vh, 1vh) * 100)',
        background: 'transparent',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      <Model url="/solids/1.glb" />
    </div>
  )
}

export default Test
