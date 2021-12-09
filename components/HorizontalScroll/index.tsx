import { SetStateAction, useEffect, useRef, useState } from 'react'
import style from './style.module.scss'

const calcDynamicHeight = (objectWidth: number, finalPadding: number) => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return objectWidth - vw + vh + finalPadding
}

const handleDynamicHeight = (
  ref: React.RefObject<HTMLElement>,
  setDynamicHeight: React.Dispatch<SetStateAction<number>>,
  finalPadding: number = 32
) => {
  if (ref.current === null) return
  const objectWidth = ref.current.scrollWidth
  const dynamicHeight = calcDynamicHeight(objectWidth, finalPadding)
  setDynamicHeight(dynamicHeight)
}

const applyScrollListener = (
  ref: React.RefObject<HTMLElement>,
  setTranslateX: React.Dispatch<SetStateAction<number>>
) => {
  window.addEventListener('scroll', () => {
    if (ref.current === null) return
    const offsetTop = -ref.current.offsetTop
    setTranslateX(offsetTop)
  })
}

interface HorizontalScrollProps {
  finalPadding?: number
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children, finalPadding }) => {
  const [dynamicHeight, setDynamicHeight] = useState<number>(0)
  const [translateX, setTranslateX] = useState(0)

  const containerRef = useRef(null)
  const objectRef = useRef(null)

  const resizeHandler = () => {
    handleDynamicHeight(objectRef, setDynamicHeight)
  }

  useEffect(() => {
    handleDynamicHeight(objectRef, setDynamicHeight, finalPadding)
    window.addEventListener('resize', resizeHandler)
    applyScrollListener(containerRef, setTranslateX)
  }, [])

  return (
    <div className={style.TallOuterContainer} style={{ height: `${dynamicHeight}px` }}>
      <div ref={containerRef} className={style.StickyInnerContainer}>
        <div
          ref={objectRef}
          className={style.HorizontalTranslateContainer}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default HorizontalScroll
