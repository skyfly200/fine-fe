import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { FormattedDate } from 'react-intl'
import client from '../../client'
import { UpcomingProject } from '../../types'
import RotatedText from '../RotatedText'

import style from './style.module.scss'

interface UpcomingBannerProps {
  project: UpcomingProject
}

const UpcomingBanner: React.FC<UpcomingBannerProps> = ({ project }) => {
  const { title, name, dropDate, overview, image } = project
  const imageProps = useNextSanityImage(client, image)
  return (
    <section className={style.wrapper}>
      <div className={style.top}>
        <div className={style.headers}>
          <div className={style.rotatedWrapper}>
            <RotatedText removeWidth>
              <h5 className={style.subtitle}>UPCOMING PROJECT</h5>
            </RotatedText>
          </div>
          <div className={style.titles}>
            <h3 className={style.title}>{title}</h3>
            <h4 className={style.artist}>by {name}</h4>
          </div>
        </div>
        <div className={style.imageWrapper}>
          <Image layout="fill" objectFit="cover" alt="upcoming-project-image" {...imageProps} />
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.dateWrapper}>
          <p className={style.drop}>Drop on:</p>
          <br />
          <span className={style.date}>
            <FormattedDate value={dropDate} />
          </span>
        </div>
        <div className={style.overview}>
          <p>{overview}</p>
        </div>
      </div>
    </section>
  )
}

export default UpcomingBanner
