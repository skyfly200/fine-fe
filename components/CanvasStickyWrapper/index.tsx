import { useState, useEffect } from 'react'
import { Size } from '../../types'
import { useWindowSize } from '../../utils'
import style from './style.module.scss'

interface CanvasStickyWrapperProps {
  size: Size
  wrapperWidth: number
  controls?: React.ReactNode
}

type WrapperStyle = {
  height?: number | string
  width?: number | string
  top?: number | string
  left?: number | string
  marginBottom?: number | string
}

const gap = 16

const CanvasStickyWrapper: React.FC<CanvasStickyWrapperProps> = ({
  children,
  size,
  wrapperWidth,
  controls
}) => {
  const { height: artH, width: artW } = size
  const { height: windowH } = useWindowSize()
  const [wrapperStyle, setStyle] = useState<WrapperStyle>()
  const [dummyH, setDummyH] = useState<number | string>()

  const isMobile = wrapperWidth < 1000

  useEffect(() => {
    const s: WrapperStyle = {}

    if (isMobile) {
      const w = wrapperWidth - gap * 2
      const h = (artH * w) / artW
      s.height = h
      s.width = w
      s.top = (windowH - h) / 2
      s.marginBottom = (windowH - h) / 2
      setDummyH(windowH - 44.8)
    } else {
      const w = (wrapperWidth - 4 * gap) / 3
      const h = (artH * w) / artW
      s.height = h
      s.width = w
      s.top = (windowH - h) / 2
      s.left = w + 2 * gap
      s.marginBottom = (windowH - h) / 2
      setDummyH((windowH - h) / 2)
    }
    setStyle(s)
  }, [wrapperWidth, windowH, artW, artH, isMobile])

  return (
    <>
      <div className={style.canvasStickyWrapper} style={wrapperStyle}>
        {children}
      </div>
      <div style={{ height: dummyH }} className={style.controlsWrapper}>
        {' '}
        {controls && <div className={style.controls}>{controls}</div>}
      </div>
    </>
  )
}

export default CanvasStickyWrapper
