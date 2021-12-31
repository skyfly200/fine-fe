import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import groq from 'groq'

import { Event, News, Project, UpcomingProject } from '../types'
import Carousel from '../components/Carousel'
import Layout from '../containers/Layout'
import NewsCard from '../components/NewsCard'
import RoundButton from '../components/RoundedButton'
import Link from '../components/Link'
import UpcomingBanner from '../components/UpcomingBanner'
import RotatedText from '../components/RotatedText'

import fixture from '../fixtures/home'
import projects from '../fixtures/projects'

import styles from './Home.module.scss'
import EventCard from '../components/EventCard'
import client from '../client'

interface HomeProps {
  news: News[]
  events: Event[]
  upcoming: UpcomingProject
  project: Project
}

const DynamicPixelHero = dynamic(() => import('../components/PixelHero'))

const Home: NextPage<HomeProps> = ({ news, events, project, upcoming }) => {
  const items = project.artworks?.slice(0, 100) || []
  const carouselItems = events.map((ev, i) => (
    <Link key={`eventcard-${i}`} href={`/event/${ev.id}`}>
      <EventCard {...ev} />
    </Link>
  ))
  return (
    <Layout greyBG>
      <Head>
        <title>FINE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.heroWrapper}>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.rotatedWrapper}>
              <div className={styles.rotatedSubtitle}>
                <h5>NEW PROJECT</h5>
              </div>
            </div>
            <h2 className={styles.projectName}>{project.name}</h2>
          </div>
          <div className={styles.bottom}>
            <div className={styles.buttonWrapper}>
              <Link href={`/project/${project.id}`}>
                <RoundButton size="xl">GO</RoundButton>
              </Link>
            </div>
            <div className={styles.artistName}>By Adam Ferris</div>
          </div>
        </div>

        <DynamicPixelHero items={items} />
      </section>
      <section className={styles.newsAndEventsWrapper}>
        <div className={styles.subtitleWrapper}>
          <RotatedText>NEWS & EVENTS</RotatedText>
        </div>
        <div className={styles.eventsWrapper}>
          <div className={styles.carouselWrapper}>
            <Carousel items={carouselItems} />
          </div>
        </div>
        <div className={styles.newsWrapper}>
          <div className={styles.newsCardWrapper}>
            {news?.map((n, i) => (
              <Link href={`/news/${n.slug.current}`} key={`${n.title}${i}`}>
                <NewsCard title={n.title} mainImage={n.mainImage} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      {upcoming && <UpcomingBanner project={upcoming} />}
      <section className={styles.circle}>
        <div className={styles.shape}>
          <p>upcoming...</p>
          <h4 className={styles.content}>Collector&apos;s Circle</h4>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const news = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `)

  return {
    props: {
      news,
      events: fixture.events,
      project: projects[0],
      upcoming: fixture.upcoming
    },
    revalidate: 60 * 60 * 24 // TODO: currently set to 1 day. Update if required
  }
}

export default Home
