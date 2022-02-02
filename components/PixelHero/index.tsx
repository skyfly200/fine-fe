import cn from 'classnames'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Artwork } from '../../types'
import { getGridData, getRandomNumber, useInterval, useWindowSize } from '../../utils'
import style from './style.module.scss'

interface PixelHeroProps {
  items: Artwork[]
}

type GridPosition = {
  gridColumn: number
  gridRow: number
}

const PixelHero: React.FC<PixelHeroProps> = ({ items }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [gridPosition, setGridPosition] = useState<GridPosition[]>([])
  const [isPlaying, setPlaying] = useState<boolean>(true)
  const q = items.length * 0.2 > 20 ? items.length * 2 : 10

  useEffect(() => {
    if (!ref.current) return
    const { cellsCount, columnCount, rowCount } = getGridData(ref.current)
    const pos: GridPosition[] = []
    for (let index = 0; index < items.length; index++) {
      const num = getRandomNumber(0, cellsCount, pos)
      const row = (num + 1) % rowCount
      const column = (num + 1) % columnCount
      pos.push({ gridColumn: column, gridRow: row })
    }
    setGridPosition(pos)
  }, [items, width])

  const updateOpenItems = () => {
    let newItems = []
    for (let index = 0; index < q; index++) {
      newItems.push(items[Math.floor(Math.random() * items.length)].id)
    }
    setOpenItems(newItems)
  }

  useInterval(updateOpenItems, isPlaying ? 1350 : null)

  return (
    <div className={style.wrapper} ref={ref}>
      {items.map((el, i) => (
        <div key={`something-${i}`} className={style.item} style={gridPosition[i]}>
          <div
            className={cn(style.imageWrapper, { [style.open]: openItems.includes(el.id) })}
            onMouseEnter={() => setPlaying(false)}
            onMouseOut={() => setPlaying(true)}
          >
            <Image
              src={el.image.src}
              layout="responsive"
              alt={el.image.alt}
              height={300}
              width={300}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PixelHero
