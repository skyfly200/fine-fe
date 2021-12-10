import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { bigGrainyShape } from '../Draws'
import style from './style.module.scss'

const LogoCanvas = () => {
  const canvasContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bigGrainyShape(canvasContainer)
  }, [])

  return (
    <Link href="/artwork/test" passHref>
      <div ref={canvasContainer} className={style.canvasContainer} />
    </Link>
  )
}

export default LogoCanvas
