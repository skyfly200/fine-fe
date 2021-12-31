import React, { useContext, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import cn from 'classnames'

import { ToastContext } from '../../containers/ToastProvider'
import HorizontalScroll from '../../components/HorizontalScroll'
import Icon from '../../components/Icon'
import Button from '../../components/Button'
import Link from '../../components/Link'

import { constants } from '../../utils'
import style from './AboutUs.module.scss'
import Layout from '../../containers/Layout'

const DynamicSoonCanvas = dynamic(() => import('../../components/SoonCanvas'))

const HomePage: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { notify } = useContext(ToastContext)
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const { error } = await res.json()
    if (error) {
      notify('error', error)
      setIsSubmitting(false)
      return
    }
    notify('success', 'Success! 🎉 You are now subscribed to the newsletter.')

    setEmail('')
    setIsSubmitting(false)
  }

  return (
    <Layout hideLogo>
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
        <Link href="/">
          <Icon icon="f-logo" size="F" className={style.stickyF} />
        </Link>
        <div className={style.hero}>
          <DynamicSoonCanvas />
          <h1 className={style.logoLetters}>INE</h1>
          <div className={style.heroContent}>
            <div className={cn(style.ctaContainer, style.blank)}>
              <div className={style.rotateCTA}>
                <Link href="#artists">
                  <button className={style.heroCTA}>
                    <Icon icon="arrow-left" size="xl" />
                    <h5>
                      Artist <br /> submissions
                    </h5>
                  </button>
                </Link>
              </div>
            </div>
            <div className={cn(style.content, style.container)}>
              <p className={style.textXL}>
                FINE is an artist-run platform supporting established and emerging artists in the
                NFT space. We view the blockchain both as a platform and as a medium.
              </p>
              <p className={style.textXL}>
                We work one-on-one with artists to develop innovative projects and provide the tools
                and the knowledge necessary to do so. We are focused on building a diverse roster of
                artists aligned in their intention to create experimental work and foster a rich
                dialogue within the contemporary visual culture.
              </p>
            </div>
          </div>
        </div>

        <section className={style.footer}>
          <div className={style.footerContent}>
            <h3 className={style.subheader}>Join Our Team</h3>
            <p className={style.text}>
              If you are interested in being part of FINE and feel you have something unique to
              contribute, we would like to hear from you. We are looking to collaborate with
              Curators, Solidity Developers and others. <br />
              <br />
              <Icon icon="arrow-right" />{' '}
              <a href={`mailto:${constants.contactEmail}`} className={style.link}>
                Contact us.
              </a>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default HomePage
