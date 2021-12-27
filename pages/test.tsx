import { useEffect, useRef } from 'react'
import { bigGrainyShape } from '../components/Draws'

const Test = () => {
  const canvasContainer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      bigGrainyShape(canvasContainer)
    }
  }, [])
  return (
    <div
      style={{
        height: '100%',
        background: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        ref={canvasContainer}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: 'calc(var(--vh, 1vh) * 100)',
          background: 'transparent',
          overflow: 'hidden',
          zIndex: 1
        }}
      />
    </div>
  )
}

export default Test
