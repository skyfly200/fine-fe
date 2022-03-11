import cn from 'classnames'
import type { GetStaticProps, NextPage } from 'next'
import { Fragment, useMemo, useState } from 'react'
import Image from 'next/image'

import RotatedText from '../../components/RotatedText'
import RoundedCheckbox from '../../components/RoundedCheckbox'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'

import style from './style.module.scss'
import { FormattedDate } from 'react-intl'
import client from '../../client'
import groq from 'groq'
import { News, Event } from '../../types'
import { getEnvironmentData } from 'worker_threads'
import { urlFor } from '../../utils'
import { EventDates } from '../../components/EventCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../components/Spinner'
import { motion } from 'framer-motion'
import { banner, fadeIn } from '../../styles/motionAnimations'

interface EventsAndNewsPageProps {
  items: Items
}
type Items = Array<Event | News>
const itemsPerPage = 10

const EventsAndNewsPage: NextPage<EventsAndNewsPageProps> = ({ items }) => {
  const [showNews, setShowNews] = useState(true)
  const [showEvents, setShowEvents] = useState(true)
  const [count, setCount] = useState(itemsPerPage)

  const filteredList: Items = useMemo(() => {
    const newItems = [...items.slice(0, count)]
    if (!showEvents && showNews) return newItems.filter(el => el._type === 'post')
    if (!showNews && showEvents) return newItems.filter(el => el._type === 'event')
    return newItems
  }, [showNews, showEvents, items, count])

  const activeFilter = (showNews && !showEvents) || (!showNews && showEvents)

  return (
    <Layout greyBG>
      <div className={style.pageWrapper}>
        <div className={style.firstCol}>
          <RotatedText>
            <h2 className={style.pageTitle}>NEWS & EVENTS</h2>
          </RotatedText>
        </div>
        <motion.div variants={banner} initial="initial" animate="animate" className={style.body}>
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

          <InfiniteScroll
            dataLength={count}
            next={() => setCount(state => state + itemsPerPage)}
            hasMore={count < items.length}
            loader={
              <div className={style.spinnerWrapper}>
                <Spinner />
              </div>
            }
            className={style.list}
          >
            {filteredList.map((el, i) => (
              <motion.div
                variants={fadeIn}
                key={`${i}${el.title}`}
                className={cn(style.card, { [style.event]: el._type === 'event' })}
              >
                <div className={style.imageWrapper}>
                  <Image
                    src={urlFor(el.mainImage).url()}
                    layout="fill"
                    alt={el.title}
                    objectFit="cover"
                  />
                </div>
                {el._type === 'post' ? (
                  <div className={style.dates}>
                    <FormattedDate
                      value={el.publishedAt}
                      year="numeric"
                      month="long"
                      day="2-digit"
                    />
                  </div>
                ) : el.dates ? (
                  <EventDates dates={el.dates} />
                ) : null}

                <h3 className={style.cardTitle}>{el.title}</h3>
              </motion.div>
            ))}
          </InfiniteScroll>
        </motion.div>
      </div>
    </Layout>
  )
}

const query = groq`
  *[_type in ["event", "post"] && publishedAt < now()] | order(publishedAt desc){
    title, mainImage, slug, _type, publishedAt, dates
  } 
`

export const getStaticProps: GetStaticProps = async () => {
  const items: Items = await client.fetch(query)

  return {
    props: {
      items
    },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export default EventsAndNewsPage
