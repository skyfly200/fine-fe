import Image from 'next/image'
import Link from 'next/link'
import { Img } from '../../types'

import style from './style.module.scss'

interface ArtistCardProp {
  slug: string
  id: string
  name: string
  image?: Img
}

const ArtistCard: React.FC<ArtistCardProp> = ({ slug, name, image }) => (
  <div className={style.cardWrapper}>
    <Link href={`/artists/${slug}`} passHref>
      <div className={style.artistCard}>
        <div className={style.imageWrapper}>
          {image && (
            <Image
              src={image.src}
              width={100}
              height={100}
              layout="responsive"
              alt={`${name}-avatar`}
            />
          )}
        </div>
      </div>
    </Link>
    <span className={style.artistName}>{name}</span>
  </div>
)

export default ArtistCard
