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
import { useMemo, useState } from 'react'
import { useDebounce } from '../../utils'
import { motion } from 'framer-motion'
import { banner, fadeIn } from '../../styles/motionAnimations'

interface ArtistsPageProps {
  artists: Artist[]
}

const ArtistsPage: NextPage<ArtistsPageProps> = ({ artists }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchValue, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const filteredArtists: Artist[] = useMemo(() => {
    if (debouncedValue) {
      return artists.filter(artist =>
        artist.name?.toLowerCase().includes(debouncedValue.toLowerCase())
      )
    }
    return artists
  }, [artists, debouncedValue])

  return (
    <Layout greyBG>
      <motion.div
        variants={banner}
        initial="initial"
        animate="animate"
        className={style.DesktopTopBanner}
      >
        <motion.h4 variants={fadeIn} className={style.bannerTitle}>
          Artists Submissions
        </motion.h4>
        <motion.div variants={fadeIn} className={style.line} />
        <motion.div variants={fadeIn} className={style.bannerSection}>
          <div>Kindly submit your proposal here</div>
          <RoundedButton lineSide="left">SUBMIT</RoundedButton>
        </motion.div>
        <motion.div variants={fadeIn} className={style.line} />
        <motion.div variants={fadeIn} className={style.bannerSection}>
          <div>For any submission questions</div>
          <RoundedButton lineSide="left">CONTACT</RoundedButton>
        </motion.div>
      </motion.div>
      <div className={style.MobileTopBanner}>
        <Accordion header={<h4 className={style.bannerTitle}>Artists Submissions</h4>} initialState>
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
          <motion.div
            variants={banner}
            initial="initial"
            animate="animate"
            className={style.searchWrapper}
          >
            <motion.h1 variants={fadeIn} className={style.subtitle}>
              Featured in FINE
            </motion.h1>
            <motion.div variants={fadeIn}>
              <TextInput styleType="search" onChange={handleChange} value={searchValue} />
            </motion.div>
          </motion.div>
          <div className={style.rotatedWrapper}>
            <RotatedText>
              <h2 className={style.pageTitle}>ARTISTS</h2>
            </RotatedText>
          </div>
        </div>
        <div className={style.childrenWrapper}>
          <motion.div
            variants={banner}
            initial="initial"
            animate="animate"
            className={style.contentWrapper}
          >
            {filteredArtists.map((artist, i) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </motion.div>
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
