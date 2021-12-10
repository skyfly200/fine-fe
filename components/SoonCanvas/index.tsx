import { useEffect, useRef } from 'react'
import { marchingCube } from '../Draws'
import style from './style.module.scss'

const SoonCanvas = () => {
  const canvasContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      marchingCube(canvasContainer)
    }
  }, [])

  return <div ref={canvasContainer} className={style.canvasContainer} />
}

export default SoonCanvas
