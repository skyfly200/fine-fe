import Image from 'next/image'
import { FormattedDate } from 'react-intl'
import { Event } from '../../types'

import fallbackImg from '../../assets/images/fallback.png'

import style from './style.module.scss'

const EventCard: React.FC<Event> = ({ title, images, dates }) => {
  return (
    <div className={style.eventCard}>
      <div className={style.imgWrapper}>
        <div
          className={style.img}
          style={{
            backgroundImage: `url(${images?.length && images[0].src ? images[0].src : fallbackImg})`
          }}
        />
      </div>
      {dates && dates[0] && (
        <h5 className={style.date}>
          <FormattedDate value={dates[0].detail} year="numeric" month="long" day="2-digit" />
        </h5>
      )}
      <h3 className={style.title}>{title}</h3>
    </div>
  )
}

export default EventCard
