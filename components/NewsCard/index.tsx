import Image from 'next/image'
import client from '../../client'
import { News, SanityImage } from '../../types'
import { useNextSanityImage } from 'next-sanity-image'

import style from './style.module.scss'

interface NewsCardProps {
  title: string
  mainImage: SanityImage
}

const NewsCard: React.FC<NewsCardProps> = ({ title, mainImage }) => {
  const imageProps = useNextSanityImage(client, mainImage)
  return (
    <div className={style.newsCard}>
      <div className={style.imgWrapper}>
        <Image alt="News card image" layout="responsive" className={style.img} {...imageProps} />
      </div>

      <h3 className={style.title}>{title}</h3>
    </div>
  )
}

export default NewsCard
