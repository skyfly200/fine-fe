import Image from 'next/image'
import { News } from '../../types'

import style from './style.module.scss'

const NewsCard: React.FC<News> = ({ title, mainImage }) => {
  return (
    <div className={style.newsCard}>
      <div className={style.imgWrapper}>
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          layout="fill"
          objectFit="cover"
          className={style.img}
        />
      </div>

      <h3 className={style.title}>{title}</h3>
    </div>
  )
}

export default NewsCard
