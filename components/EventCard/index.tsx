import Image from 'next/image'
import { FormattedDate } from 'react-intl'
import { Event } from '../../types'

import fallbackImg from '../../assets/images/fallback.png'

import style from './style.module.scss'
import { urlFor } from '../../utils'

const EventCard: React.FC<Event> = ({ title, mainImage, dates }) => {
  const imgSrc = urlFor(mainImage).url()

  return (
    <div className={style.eventCard}>
      <div className={style.imgWrapper}>
        <div
          className={style.img}
          style={{
            backgroundImage: `url(${imgSrc ?? fallbackImg})`
          }}
        />
      </div>
      {dates && dates[0] && (
        <div className={style.dateWrapper}>
          {dates.slice(0, 3).map((d, i) => (
            <h5 className={style.date} key={`${d.date}${i}`}>
              <FormattedDate value={d.date} year="numeric" month="long" day="2-digit" />
            </h5>
          ))}
        </div>
      )}
      <h3 className={style.title}>{title}</h3>
    </div>
  )
}

export default EventCard
