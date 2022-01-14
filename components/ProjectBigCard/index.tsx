import { useEffect, useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import { Project, ProjectDetails } from '../../types'
import { getRandomNumber, useInterval } from '../../utils'
import style from './style.module.scss'

interface Item extends Project, ProjectDetails {}

type ProjectBigCardProps = {
  item: Item
}

const ProjectBigCard: React.FC<ProjectBigCardProps> = ({ item }) => {
  const { name, artist, artworks } = item
  const [openItems, setOpenItems] = useState<number[]>([])

  const updateOpenItems = () => setOpenItems([getRandomNumber(0, 3), getRandomNumber(0, 3)])

  useEffect(updateOpenItems, [])
  useInterval(updateOpenItems, 2000)

  return (
    <>
      <div className={cn(style.rect, style.details)}>
        <h3 className={style.projectName}>{name}</h3>
        <p>by {artist.name}</p>
      </div>
      <div className={style.gallery}>
        {artworks.slice(0, 4).map((el, i) => (
          <div key={`${name}-${i}`} className={style.rect}>
            <div className={cn(style.imageWrapper, { [style.open]: openItems.includes(i) })}>
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
    </>
  )
}

export default ProjectBigCard
