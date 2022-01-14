import type { NextPage } from 'next'
import Accordion from '../../components/Accordion'
import ArtistCard from '../../components/ArtistCard'
import Link from '../../components/Link'
import RotatedText from '../../components/RotatedText'
import RoundedButton from '../../components/RoundedButton'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'

import style from './style.module.scss'

const ArtistsPage: NextPage = () => {
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
            {Array.from({ length: 30 }).map((el, i) => (
              <ArtistCard key={`artistcard-${i}`} name="some name" id={`${i}`} slug={`${i}`} />
            ))}
          </div>{' '}
        </div>
      </div>
    </Layout>
  )
}

export default ArtistsPage
