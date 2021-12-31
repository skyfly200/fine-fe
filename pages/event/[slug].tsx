import { useMemo, useState } from 'react'
import cn from 'classnames'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { FormattedDate } from 'react-intl'

import Layout from '../../containers/Layout'
import { Event, IParams, SanityImage } from '../../types'

import style from './Event.module.scss'
import SimpleTable from '../../components/SimpleTable'
import Carousel from '../../components/Carousel'
import client from '../../client'
import { useNextSanityImage } from 'next-sanity-image'
import BlockContent from '@sanity/block-content-to-react'

interface EventPageProps {
  event: Event
}

type MenuItems = 'date' | 'contact' | 'location'
interface GalleryImgProps {
  img: SanityImage
}

const GalleryImg = ({ img }: GalleryImgProps) => {
  const imageProps = useNextSanityImage(client, img)

  return (
    <div className={style.imageWrapper}>
      <Image layout="fill" objectFit="cover" {...imageProps} alt="gallery image" />
    </div>
  )
}

const EventPage: NextPage<EventPageProps> = ({ event }) => {
  const [activeDetail, setDetail] = useState<MenuItems>('date')

  const formattedDates = event?.dates?.map(el => ({
    name: el.eventName,
    date: <FormattedDate value={el.date} year="numeric" month="long" day="2-digit" />
  }))
  const formattedContacts = event?.contacts?.map(el => ({
    name: el.contactName,
    detail: el.contactDetail
  }))
  const formattedLocaitons = event?.locations?.map(el => ({
    name: el.locationName,
    detail: el.locationDetail
  }))

  const menuItems: MenuItems[] = []
  if (event?.dates) {
    menuItems.push('date')
  }
  if (event?.contacts) menuItems.push('contact')
  if (event?.locations) menuItems.push('location')
  //@ts-ignore
  const cleanTableDataFromSanity = arr => arr?.map(({ _key, _type, ...attr }) => attr)
  const displayedTable = useMemo(() => {
    return {
      date: cleanTableDataFromSanity(formattedDates),
      contact: cleanTableDataFromSanity(formattedContacts),
      location: cleanTableDataFromSanity(formattedLocaitons)
    }[activeDetail]
  }, [activeDetail, formattedDates, formattedContacts, formattedLocaitons])

  const carouselItems = event?.gallery.images?.map((img, i) => (
    <GalleryImg img={img} key={`galler-img-${i}`} />
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
            <h1 className={style.title}>{event?.title}</h1>
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
            <h3 className={style.subtitle}>{event?.subtitle}</h3>
          </div>
          <div className={style.bottom}>
            <div className="sanity-body">
              {event?.body && (
                <BlockContent
                  blocks={event.body}
                  imageOptions={{ w: 680, fit: 'max' }}
                  {...client.config()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const event = await client.fetch(
    `
      *[_type == "event" && slug.current == $slug][0]
    `,
    { slug }
  )
  return {
    props: {
      event
    },
    revalidate: 60 * 60 * 24 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(`*[_type == "event" && defined(slug.current)][].slug.current`)
  console.log('Event-PATHS:::', paths)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true
  }
}

export default EventPage
