import cn from 'classnames'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import client from '../../client'
import { Artist } from '../../types'
import Icon from '../Icon'
import SocialNetworksList from '../SocialNetworksList'
import style from './style.module.scss'

interface ArtistFullCardProps {
  artist: Artist
  className?: string
}

const ArtistFullCard: React.FC<ArtistFullCardProps> = ({ artist, className }) => {
  const imageProps = useNextSanityImage(client, artist.image)
  return (
    <div className={cn(style.wrapper, className)}>
      <div className={style.avatarWrapper}>
        {artist?.image && <Image {...imageProps} layout="responsive" alt={`${name}-avatar`} />}
      </div>
      <div>
        <h1 className={style.artistName}>{artist?.name}</h1>
        <div className={style.socialNetworks}>
          {artist?.discord && (
            <a href={artist.discord}>
              <Icon icon="discord" size="xl" />
            </a>
          )}
          {artist?.instagram && (
            <a href={artist?.instagram}>
              <Icon icon="instagram" size="xl" />
            </a>
          )}
          {artist?.twitter && (
            <a href={artist?.twitter}>
              <Icon icon="twitter" size="xl" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtistFullCard
