import { useEffect, useRef } from 'react'
import { useThree, extend } from '@react-three/fiber'
import { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'

extend({ PointerLockControlsImpl })

export const PointerLockControls = props => {
  const { camera, gl } = useThree()
  const controls = useRef()

  useEffect(() => {
    document.addEventListener('click', () => {
      controls.current.lock()
    })
  }, [])

  return <pointerLockControlsImpl ref={controls} args={[camera, gl.domElement]} {...props} />
}
