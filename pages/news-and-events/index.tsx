import cn from 'classnames'
import type { NextPage } from 'next'
import { Fragment, useMemo, useState } from 'react'
import Image from 'next/image'

import RotatedText from '../../components/RotatedText'
import RoundedCheckbox from '../../components/RoundedCheckbox'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'

import style from './style.module.scss'
import { FormattedDate } from 'react-intl'

interface EventsAndNewsPageProps {}
const data = [
  {
    img: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640787269/fine/event-1_xihxng.jpg',
    type: 'event',
    title: 'Some event on some date. Radical Gaming – Immersion. Simulation. Subversion',
    date: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
  },
  {
    img: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640168939/fine/fine-timesquare_r0zcj6.jpg',
    type: 'news',
    title: 'Very insteresting article',
    date: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
  },
  {
    img: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640168939/fine/fine-timesquare_r0zcj6.jpg',
    type: 'news',
    title: 'Very insteresting article',
    date: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
  },
  {
    img: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640168939/fine/fine-timesquare_r0zcj6.jpg',
    type: 'news',
    title: 'Very insteresting article',
    date: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
  },
  {
    img: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640787269/fine/event-1_xihxng.jpg',
    type: 'event',
    title: 'Some event on some date. Radical Gaming – Immersion. Simulation. Subversion',
    date: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
  },
  {
    img: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640168939/fine/fine-timesquare_r0zcj6.jpg',
    type: 'news',
    title: 'Very insteresting article',
    date: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
  },
  {
    img: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640787269/fine/event-1_xihxng.jpg',
    type: 'event',
    title: 'Some event on some date. Radical Gaming – Immersion. Simulation. Subversion',
    date: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
  }
]
const EventsAndNewsPage: NextPage<EventsAndNewsPageProps> = () => {
  const [showNews, setShowNews] = useState(true)
  const [showEvents, setShowEvents] = useState(true)

  const filteredList = useMemo(() => {
    if (!showEvents && showNews) return data.filter(el => el.type === 'news')
    if (!showNews && showEvents) return data.filter(el => el.type === 'event')
    return data
  }, [showNews, showEvents])

  const activeFilter = (showNews && !showEvents) || (!showNews && showEvents)
  return (
    <Layout>
      <div className={style.pageWrapper}>
        <div className={style.firstCol}>
          <RotatedText>
            <h2 className={style.pageTitle}>NEWS & EVENTS</h2>
          </RotatedText>
        </div>
        <div className={style.body}>
          <div className={style.header}>
            <div className={style.filterContainer}>
              <span className={style.filterBy}>FILTER BY: </span>
              <RoundedCheckbox
                label="NEWS"
                id="news"
                checked={showNews}
                onChange={() => setShowNews(show => !show)}
              />
              <RoundedCheckbox
                label="EVENTS"
                id="events"
                checked={showEvents}
                onChange={() => setShowEvents(show => !show)}
              />
            </div>
            <span className={style.separator} />
            <TextInput styleType="search" placeholder="Search..." />
          </div>
          <div className={style.list}>
            {filteredList.map((el, i) => (
              <Fragment key={`${i}${el.title}`}>
                {el.type === 'event' && (
                  <div className={cn(style.blank, { [style.activeFilter]: activeFilter })} />
                )}
                <div className={cn(style.card, { [style.event]: el.type === 'event' })}>
                  <div className={style.imageWrapper}>
                    <Image src={el.img} layout="fill" alt={el.title} objectFit="cover" />
                  </div>

                  <div>
                    <FormattedDate value={el.date} year="numeric" month="long" day="2-digit" />
                  </div>

                  <h2 className={style.cardTitle}>{el.title}</h2>
                </div>
                {el.type === 'event' && (
                  <div className={cn(style.blank, { [style.activeFilter]: activeFilter })} />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EventsAndNewsPage
