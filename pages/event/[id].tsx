import { useMemo, useState } from 'react'
import cn from 'classnames'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { FormattedDate } from 'react-intl'

import Layout from '../../containers/Layout'
import { events } from '../../fixtures'
import { Event, IParams } from '../../types'

import style from './Event.module.scss'
import SimpleTable from '../../components/SimpleTable'
import Carousel from '../../components/Carousel'

interface EventPageProps {
  event: Event
}

type MenuItems = 'date' | 'contact' | 'location'

const EventPage: NextPage<EventPageProps> = ({ event }) => {
  const [activeDetail, setDetail] = useState<MenuItems>('date')
  const { title, subtitle, body, images, contacts, locations, dates } = event
  const formattedDates = dates?.map(el => ({
    ...el,
    detail: <FormattedDate value={el.detail} year="numeric" month="long" day="2-digit" />
  }))

  const menuItems: MenuItems[] = []
  if (dates) menuItems.push('date')
  if (contacts) menuItems.push('contact')
  if (locations) menuItems.push('location')

  const displayedTable = useMemo(() => {
    return {
      date: formattedDates,
      contact: contacts,
      location: locations
    }[activeDetail]
  }, [activeDetail, formattedDates, contacts, locations])

  const carouselItems = images?.map((el, i) => (
    <div key={`event-images-${i}`} className={style.imageWrapper}>
      <Image layout="fill" objectFit="cover" src={el.src} alt={el.alt} />
    </div>
  ))

  return (
    <Layout>
      <div className={style.eventPage}>
        <aside className={style.aside}>
          <div className={style.carousel}>
            <Carousel items={carouselItems} />
          </div>
        </aside>

        <div className={style.content}>
          <div className={style.top}>
            <h1 className={style.title}>{title}</h1>
            <div className={style.details}>
              <ul className={style.localMenu}>
                {menuItems.map(item => (
                  <li
                    key={item}
                    className={cn(style.localMenuItem, { [style.active]: item === activeDetail })}
                  >
                    <button onClick={() => setDetail(item)}>{item}</button>
                  </li>
                ))}
              </ul>
              <div className={style.tableWrapper}>
                {displayedTable && <SimpleTable rows={displayedTable} />}
              </div>
            </div>
            <h3 className={style.subtitle}>{subtitle}</h3>
          </div>
          <div className={style.bottom}>
            {body?.map((p, i) => (
              <p key={`event-body-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams
  const event = events.find(item => item.id === id)
  return {
    props: {
      event
    },
    revalidate: 60 * 60 * 24 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = events.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: false
  }
}

export default EventPage
