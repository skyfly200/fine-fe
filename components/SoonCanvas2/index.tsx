import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import {
  Html,
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial
} from '@react-three/drei'

import style from './style.module.scss'

const colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff', '#fafafa']

function MainSphere({ material, onPointerEnter }) {
  const main = useRef()
  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime()
    main.current.rotation.y = THREE.MathUtils.lerp(main.current.rotation.y, mouse.x * Math.PI, 0.1)
    main.current.rotation.x = THREE.MathUtils.lerp(main.current.rotation.x, mouse.y * Math.PI, 0.1)
  })
  return (
    <Icosahedron
      args={[1, 4]}
      ref={main}
      material={material}
      position={[0, 0, 0]}
      onPointerEnter={onPointerEnter}
    />
  )
}

function Scene() {
  const bumpMap = useTexture('/bump.jpg')
  const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], {
    path: '/cube/'
  })
  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState()
  const [blobColor, setBlobColor] = useState('#fafafa')

  return (
    <>
      <MeshDistortMaterial
        ref={set}
        envMap={envMap}
        bumpMap={bumpMap}
        color={blobColor}
        roughness={0}
        metalness={0}
        bumpScale={0.0005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      />
      {material && (
        <MainSphere
          material={material}
          onPointerEnter={() => setBlobColor(colors[Math.floor(Math.random() * colors.length)])}
        />
      )}
    </>
  )
}

const SoonCanvas2 = () => {
  return (
    <div className={style.canvasContainer}>
      <Canvas
        camera={{ position: [0, 0, 2] }}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          stencil: false,
          depth: false
        }}
      >
        <Suspense fallback={<Html center>Loading.</Html>}>
          <Scene />
        </Suspense>
        <EffectComposer multisampling={0} disableNormalPass={true}>
          {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
          <Noise opacity={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
export default SoonCanvas2
