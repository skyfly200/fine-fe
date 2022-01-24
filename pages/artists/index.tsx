import type { GetStaticProps, NextPage } from 'next'
import groq from 'groq'

import client from '../../client'
import Accordion from '../../components/Accordion'
import ArtistCard from '../../components/ArtistCard'
import Link from '../../components/Link'
import RotatedText from '../../components/RotatedText'
import RoundedButton from '../../components/RoundedButton'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'
import { Artist } from '../../types'

import style from './style.module.scss'

interface ArtistsPageProps {
  artists: Artist[]
}

const ArtistsPage: NextPage<ArtistsPageProps> = ({ artists }) => {
  return (
    <Layout greyBG>
      <div className={style.DesktopTopBanner}>
        <h4 className={style.bannerTitle}>Artists Submissions</h4>
        <div className={style.line} />
        <div className={style.bannerSection}>
          <div>Kindly submit your proposal here</div>
          <RoundedButton lineSide="left">SUBMIT</RoundedButton>
        </div>
        <div className={style.line} />
        <div className={style.bannerSection}>
          <div>For any submission questions</div>
          <RoundedButton lineSide="left">CONTACT</RoundedButton>
        </div>
      </div>
      <div className={style.MobileTopBanner}>
        <Accordion header={<h4 className={style.bannerTitle}>Artists Submissions</h4>}>
          <div className={style.accordionSubmission}>
            <div className={style.bannerSection}>
              <div>Kindly submit your proposal here</div>
              <div className={style.line} />
              <RoundedButton lineSide="left">SUBMIT</RoundedButton>
            </div>
            <div className={style.bannerSection}>
              <div>For any submission questions</div>
              <div className={style.line} />
              <RoundedButton lineSide="left">CONTACT</RoundedButton>
            </div>
          </div>
        </Accordion>
      </div>
      <div className={style.pageWrapper}>
        <div className={style.firstCol}>
          <div className={style.blank} />
          <div className={style.searchWrapper}>
            <h1 className={style.subtitle}>Featured in FINE</h1>
            <TextInput styleType="search" />
          </div>
          <div className={style.rotatedWrapper}>
            <RotatedText>
              <h2 className={style.pageTitle}>ARTISTS</h2>
            </RotatedText>
          </div>
        </div>
        <div className={style.childrenWrapper}>
          <div className={style.contentWrapper}>
            {artists.map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>{' '}
        </div>
      </div>
    </Layout>
  )
}

const query = groq`
  *[_type == "artist"]
`

export const getStaticProps: GetStaticProps = async context => {
  const artists = await client.fetch(query)

  return {
    props: { artists },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export default ArtistsPage
