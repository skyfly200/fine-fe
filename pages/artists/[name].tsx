import type { NextPage } from 'next'

import Layout from '../../containers/Layout'

import style from '../../styles/pages/artwork.module.scss'

const ArtistPage: NextPage = () => {
  return (
    <Layout>
      <div className={style.gallery}>
        <div className={style.canvasWrapper}></div>
      </div>
    </Layout>
  )
}

export default ArtistPage
