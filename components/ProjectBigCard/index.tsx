import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import cn from 'classnames'

import { Project, ProjectDetails, SanityImage, SanitySlug } from '../../types'
import { getRandomNumber, useInterval } from '../../utils'
import style from './style.module.scss'
import Link from 'next/link'
import client from '../../client'
import GalleryImage from './GalleryImage'

interface Item extends Project, ProjectDetails {}

type ProjectBigCardProps = {
  title: string
  slug: SanitySlug
  galleryImages: SanityImage[]
  artistName: string
}

const ProjectBigCard: React.FC<ProjectBigCardProps> = ({
  title,
  slug,
  galleryImages,
  artistName
}) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const updateOpenItems = () => setOpenItems([getRandomNumber(0, 3), getRandomNumber(0, 3)])

  useEffect(updateOpenItems, [])
  useInterval(updateOpenItems, 2000)

  return (
    <>
      <Link href={`/collection/${slug.current}`} passHref>
        <div className={cn(style.rect, style.details)}>
          <h3 className={style.projectName}>{title}</h3>
          <p>by {artistName}</p>
        </div>
      </Link>
      <div className={style.gallery}>
        {galleryImages.slice(0, 4).map((el, i) => (
          <GalleryImage
            key={`${title}-${i}-gallery-image`}
            image={el}
            title={title}
            openItems={openItems}
            i={i}
          />
        ))}
      </div>
    </>
  )
}

export default ProjectBigCard
