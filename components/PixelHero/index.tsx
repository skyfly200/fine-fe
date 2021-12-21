import cn from 'classnames'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { PartialArtwork } from '../../types'
import { getGridData, getRandomNumber, useInterval, useWindowSize } from '../../utils'
import style from './style.module.scss'

interface PixelHeroProps {
  items: PartialArtwork[]
}

const PixelHero: React.FC<PixelHeroProps> = ({ items }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [gridPosition, setGridPosition] = useState<number[]>([])
  const [isPlaying, setPlaying] = useState<boolean>(true)
  const q = items.length * 0.2 > 20 ? items.length * 2 : 10

  useEffect(() => {
    if (!ref.current) return
    const { cellsCount, columnCount } = getGridData(ref.current)
    const pos: number[] = []
    for (let index = 0; index < items.length; index++) {
      const num = getRandomNumber(0, cellsCount, pos)
      const row = num / columnCount
      const column = num % columnCount
      console.log(row, column)
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

  useInterval(updateOpenItems, isPlaying ? 2000 : null)

  return (
    <div className={style.wrapper} ref={ref}>
      {items.map(el => (
        <div key={el.id} className={style.item}>
          <div
            className={cn(style.imageWrapper, { [style.open]: openItems.includes(el.id) })}
            onMouseEnter={() => setPlaying(false)}
            onMouseOut={() => setPlaying(true)}
          >
            <Image
              src={el.previewImg.src}
              layout="responsive"
              alt={el.previewImg.alt}
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
