import cn from 'classnames'
import Image from 'next/image'
import { Artist } from '../../types'
import SocialNetworksList from '../SocialNetworksList'
import style from './style.module.scss'

interface ArtistFullCardProps {
  artist: Artist
  className?: string
}

const ArtistFullCard: React.FC<ArtistFullCardProps> = ({ artist, className }) => {
  return (
    <div className={cn(style.wrapper, className)}>
      <div className={style.avatarWrapper}>
        {artist.image && (
          <Image
            src={artist.image.src}
            width={100}
            height={100}
            layout="responsive"
            alt={`${artist.name}-avatar`}
          />
        )}
      </div>
      <div>
        <h1 className={style.artistName}>{artist.name}</h1>
        <SocialNetworksList socialNetworks={artist.socialNetworks} size="xl" />
      </div>
    </div>
  )
}

export default ArtistFullCard
