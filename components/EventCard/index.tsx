import Image from 'next/image'
import { FormattedDate } from 'react-intl'
import style from './style.module.scss'

export interface EventCardProps {
  title: string
  img: string
  alt?: string
  date?: Date | string
}

const EventCard: React.FC<EventCardProps> = ({ title, img, alt, date }) => {
  return (
    <div className={style.eventCard}>
      <div className={style.imgWrapper}>
        <div className={style.img} style={{ backgroundImage: `url(${img})` }} />
      </div>
      <h5 className={style.date}>
        <FormattedDate value={date} year="numeric" month="long" day="2-digit" />
      </h5>
      <h3 className={style.title}>{title}</h3>
    </div>
  )
}

export default EventCard
