import cn from 'classnames'

import RotatedText from '../RotatedText'
import ArtistCard from '../ArtistCard'
import RoundedButton from '../RoundedButton'
import { Artist } from '../../types'

import s from './style.module.scss'
import sc from '../../styles/components.module.scss'

interface ArtistsBannerProps {
  artists: Artist[]
  curators: Artist[]
}

const ArtistBanner: React.FC<ArtistsBannerProps> = ({ artists, curators }) => {
  return (
    <section className={s.wrapper}>
      <div className={s.leftCol}>
        <RotatedText center>
          <h3 className={sc.h3}>FEATURED IN FINE</h3>
        </RotatedText>
      </div>
      <div className={s.artists}>
        <h3 className={cn(s.subtitle, sc.h3)}>FINE ARTISTS</h3>
        <div className={s.content}>
          <ul className={cn(s.list, s.artistsList)}>
            {artists.map(artist => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </ul>

          <RoundedButton lineSide="left">ALL ARTISTS</RoundedButton>
        </div>
      </div>
      <div className={s.curators}>
        <h3 className={cn(s.subtitle, sc.h3)}>FINE CURATORS</h3>

        <div className={s.content}>
          <ul className={s.list}>
            {curators.map(curator => (
              <li className={s.curatorName} key={curator._id}>
                {curator.name}
              </li>
            ))}
          </ul>

          <RoundedButton lineSide="left">FINE TEAM</RoundedButton>
        </div>
      </div>
    </section>
  )
}

export default ArtistBanner
