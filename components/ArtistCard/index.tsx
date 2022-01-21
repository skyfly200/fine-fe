import { useNextSanityImage } from 'next-sanity-image'
import NextImage from 'next/image'
import Link from 'next/link'
import client from '../../client'
import { Artist } from '../../types'

import style from './style.module.scss'

interface ArtistCardProp {
  artist: Artist
}

const ArtistCard: React.FC<ArtistCardProp> = ({ artist }) => {
  const { slug, name, image } = artist
  const imageProps = useNextSanityImage(client, image)
  return (
    <div className={style.cardWrapper}>
      <Link href={`/artists/${slug.current}`} passHref>
        <div className={style.artistCard}>
          <div className={style.imageWrapper}>
            <NextImage layout="responsive" alt={`${name}-avatar`} {...imageProps} />
          </div>
        </div>
      </Link>
      <span className={style.artistName}>{name}</span>
    </div>
  )
}

export default ArtistCard
