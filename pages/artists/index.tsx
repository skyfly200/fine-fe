import type { NextPage } from 'next'
import ArtistCard from '../../components/ArtistCard'
import Link from '../../components/Link'
import RoundedButton from '../../components/RoundedButton'
import Layout from '../../containers/Layout'
import SideSearch from '../../containers/Layout/SideSearch'

import style from './style.module.scss'

const ArtistsPage: NextPage = () => {
  return (
    <Layout greyBG>
      <TopBanner />
      <SideSearch title="ARTISTS">
        <div className={style.contentWrapper}>
          {Array.from({ length: 30 }).map((el, i) => (
            <ArtistCard key={`artistcard-${i}`} name="some name" id={`${i}`} slug={`${i}`} />
          ))}
        </div>
      </SideSearch>
    </Layout>
  )
}

const TopBanner = () => (
  <div className={style.topBanner}>
    <h4 className={style.bannerTitle}>Artists Submissions</h4>
    <div className={style.line} />
    <div className={style.bannerSection}>
      <div>Kindly submit your proposal here:</div>
      <RoundedButton lineSide="left">SUBMIT</RoundedButton>
    </div>
    <div className={style.line} />
    <div className={style.bannerSection}>
      <div>For any submission questions</div>
      <RoundedButton lineSide="left">CONTACT</RoundedButton>
    </div>
  </div>
)

export default ArtistsPage
