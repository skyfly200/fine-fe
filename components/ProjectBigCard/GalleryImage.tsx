import Image from 'next/image'
import cn from 'classnames'
import style from './style.module.scss'
import { useNextSanityImage } from 'next-sanity-image'
import client from '../../client'
import { SanityImage } from '../../types'

interface GalleryImageProps {
  image: SanityImage
  title: string
  openItems: number[]
  i: number
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, title, openItems, i }) => {
  const imageProps = useNextSanityImage(client, image)
  return (
    <div className={style.rect}>
      <div className={cn(style.imageWrapper, { [style.open]: openItems.includes(i) })}>
        <Image layout="fill" objectFit="cover" alt={`${title}-gallery-image`} {...imageProps} />
      </div>
    </div>
  )
}

export default GalleryImage
