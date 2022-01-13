import Link from 'next/link'
import { Img } from '../../types'

import style from './style.module.scss'

interface ArtistCardProp {
  slug: string
  id: string
  name: string
  image?: Img
}

const ArtistCard: React.FC<ArtistCardProp> = ({ slug, id, name, image }) => (
  <div key={id} className={style.cardWrapper}>
    <Link href={`/artists/${id}`} passHref>
      <div className={style.artistCard} />
    </Link>
    <span className={style.artistName}>some name</span>
  </div>
)

export default ArtistCard
