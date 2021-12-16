import { useState, useEffect } from 'react'
import { Size } from '../../types'
import { useWindowSize } from '../../utils'
import style from './style.module.scss'

interface CanvasStickyWrapperProps {
  size: Size
}

type WrapperStyle = {
  height?: number | string
  width?: number | string
  top?: number | string
  left?: number | string
  marginBottom?: number | string
}

const CanvasStickyWrapper: React.FC<CanvasStickyWrapperProps> = ({ children, size }) => {
  const { height: artH, width: artW } = size
  const { height: windowH, width: windowW } = useWindowSize()
  const [wrapperStyle, setStyle] = useState<WrapperStyle>()
  const [dummyH, setDummyH] = useState<number | string>()

  const isMobile = windowW < 1000

  useEffect(() => {
    const s: WrapperStyle = {}

    if (isMobile) {
      const w = windowW - 32
      const h = (artH * w) / artW
      console.log(artW, artH)
      console.log(w, h)
      s.height = h
      s.width = w
      s.top = (windowH - h) / 2
      s.marginBottom = (windowH - h) / 2
      setDummyH(windowH - 44.8)
    } else {
      const w = (windowW - 64) / 3
      const h = (artH * w) / artW
      s.height = h
      s.width = w
      s.top = (windowH - h) / 2
      s.left = (windowW - 48) / 3
      s.marginBottom = (windowH - h) / 2
      setDummyH((windowH - h) / 2)
    }
    setStyle(s)
  }, [windowW, windowH, artW, artH, isMobile])

  return (
    <>
      <div className={style.canvasStickyWrapper} style={wrapperStyle}>
        {children}
      </div>
      <div style={{ height: dummyH }} />
    </>
  )
}

export default CanvasStickyWrapper
