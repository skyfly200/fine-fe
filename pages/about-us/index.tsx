import React, { useContext, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import style from './AboutUs.module.scss'
import Layout from '../../containers/Layout'

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Fine</title>
        <meta
          name="description"
          content="artist-run platform supporting established artists in the NFT space and
            artists entering the NFT space for the first time"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dhrwv7wvb/image/upload/v1639149533/fine/fine-meta-image_g1tndh.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.home}>
        <strong>Soon...</strong>
      </div>
    </Layout>
  )
}

export default HomePage
