import cn from 'classnames'
import { useState, useEffect, SetStateAction } from 'react'
import { Size } from '../../types'
import { useWindowSize } from '../../utils'
import RoundedButton from '../RoundedButton'
import style from './style.module.scss'

interface CanvasStickyWrapperProps {
  size: Size
  wrapperWidth: number
  controls?: React.ReactNode
  fullScreen?: boolean
  setFullScreen?: React.Dispatch<SetStateAction<boolean>>
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
  controls,
  fullScreen,
  setFullScreen
}) => {
  const { height: artH, width: artW } = size
  const { height: windowH } = useWindowSize()
  const [wrapperStyle, setStyle] = useState<WrapperStyle>()
  const [dummyH, setDummyH] = useState<number | string>()

  const isMobile = wrapperWidth < 1000

  useEffect(() => {
    const s: WrapperStyle = {}
    if (fullScreen) {
      s.width = wrapperWidth
      s.height = windowH
      s.top = 0
    } else if (isMobile) {
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
  }, [wrapperWidth, windowH, artW, artH, isMobile, fullScreen])

  return (
    <>
      <div
        className={cn(style.canvasStickyWrapper, { [style.fullScreen]: fullScreen })}
        style={wrapperStyle}
      >
        {children}
      </div>
      <div style={{ height: dummyH }} className={style.controlsWrapper}>
        {' '}
        {controls && <div className={style.controls}>{controls}</div>}
      </div>
      {fullScreen && setFullScreen && (
        <div className={style.closeWrapper}>
          <RoundedButton onClick={() => setFullScreen(false)}>close</RoundedButton>
        </div>
      )}
    </>
  )
}

export default CanvasStickyWrapper
