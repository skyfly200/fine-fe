import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'

import { Ground } from '../../components/ArtPreviewer/ObjectDisplayer'
import RoundedCheckbox from '../../components/RoundedCheckbox'

import style from './style.module.scss'

type ModelLoaderProps = {
  file?: File
}

const ModelLoader = ({ file }: ModelLoaderProps) => {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    const reader = new FileReader()
    reader.onload = function (gltfText) {
      const loader = new GLTFLoader()
      const draco = new DRACOLoader()
      draco.setDecoderPath('/draco/')
      loader.setDRACOLoader(draco)
      loader.parse(
        // @ts-ignore
        gltfText.target.result,
        '',
        function (gltf) {
          const box = new THREE.Box3().setFromObject(gltf.scene)
          const size = box.getSize(new THREE.Vector3()).length()
          const center = box.getCenter(new THREE.Vector3())
          gltf.scene.children.forEach(child => {
            if (child.type === 'Object3D') {
              child.children.forEach(granChildren => {
                if (granChildren.type === 'Object3D') {
                  granChildren.children.forEach(granGrandChildren => {
                    granGrandChildren.castShadow = true
                  })
                } else {
                  granChildren.castShadow = true
                }
              })
            } else {
              child.castShadow = true
            }
          })
          // position model
          gltf.scene.position.x += gltf.scene.position.x - center.x
          gltf.scene.position.y = 0.01 // avoid blinking
          gltf.scene.position.z += gltf.scene.position.z - center.z

          // position camera
          camera.position.z = size
          camera.position.y = 10

          console.log('FLAG', gltf)
          // set shadow casting

          scene.add(gltf.scene)
          gl.render(scene, camera)
        },
        function (errormsg) {
          console.error(errormsg)
        }
      )
    }
    // @ts-ignore
    reader.readAsArrayBuffer(file)
  }, [gl, scene, camera, file])
  return <></>
}

interface SceneProps extends ModelLoaderProps {
  activeColor: string
  spotlightOn: boolean
  fogOn: boolean
}

const Scene = ({ activeColor, file, spotlightOn, fogOn }: SceneProps) => {
  return (
    <Canvas shadows>
      <color attach="background" args={[activeColor]} />
      {fogOn && <fog attach="fog" args={[activeColor, 30, 200]} />}
      {spotlightOn && (
        <spotLight position={[0, 80, -40]} angle={0.5} intensity={0.5} castShadow penumbra={0.3} />
      )}

      <ambientLight />
      {file && (
        <>
          <ModelLoader file={file} />
        </>
      )}

      <Ground groundColor={activeColor} />
      <OrbitControls autoRotate />
    </Canvas>
  )
}

const Playground = () => {
  const [activeColor, setColor] = useState('#FEFEFE')
  const [file, setFile] = useState<File>()
  const [spotlightOn, setSpotlight] = useState<boolean>(true)
  const [fogOn, setFog] = useState<boolean>(true)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e?.target?.files && (e?.target?.files[0] as File)
    uploadedFile && setFile(uploadedFile)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.controls}>
        <div className={style.fileInputWrapper}>
          <label htmlFor="fileinput">FILE</label>
          <input id="fileinput" type="file" onChange={handleUpload} />
        </div>
        <RoundedCheckbox
          label="SPOTLIGHT"
          onChange={() => setSpotlight(s => !s)}
          checked={spotlightOn}
        />
        <RoundedCheckbox label="FOG" onChange={() => setFog(s => !s)} checked={fogOn} />
        <div className={style.colorInputWrapper}>
          <label htmlFor="colorinput">COLOR</label>
          <input
            id="colorinput"
            type="color"
            value={activeColor}
            onChange={e => setColor(e.target.value)}
          />
        </div>
      </div>
      <Scene activeColor={activeColor} file={file} fogOn={fogOn} spotlightOn={spotlightOn} />
    </div>
  )
}

export default Playground
