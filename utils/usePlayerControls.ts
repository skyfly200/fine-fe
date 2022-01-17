import { useState, useEffect } from 'react'

const keys = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'Space']
type Key = typeof keys[number]
const isValid = (x: any): x is Key => keys.includes(x)
type Keys = {
  [key in Key]: string
}

function moveFieldByKey(key: Key) {
  const keys: Keys = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump'
  }
  return keys[key]
}

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false
  })

  useEffect(() => {
    const handleKeyDown = (code: Key) =>
      setMovement(m => ({
        ...m,
        [moveFieldByKey(code)]: true
      }))

    const handleKeyUp = (code: Key) =>
      setMovement(m => ({
        ...m,
        [moveFieldByKey(code)]: false
      }))

    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => isValid(e.code) && handleKeyDown(e.code)
    )
    document.addEventListener('keyup', (e: KeyboardEvent) => isValid(e.code) && handleKeyUp(e.code))

    return () => {
      document.removeEventListener(
        'keydown',
        (e: KeyboardEvent) => isValid(e.code) && handleKeyDown(e.code)
      )
      document.removeEventListener(
        'keyup',
        (e: KeyboardEvent) => isValid(e.code) && handleKeyUp(e.code)
      )
    }
  }, [])

  return movement
}

export default usePlayerControls
