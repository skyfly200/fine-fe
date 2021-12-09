import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import cn from 'classnames'

import Icon from '../components/Icon'
import NumberBar from '../components/NumberBar'
import { constants } from '../utils'

import style from '../styles/pages/Soon.module.scss'
import text from '../styles/typography.module.scss'
import HorizontalScroll from '../components/HorizontalScroll'

const SoonCanvas = dynamic(() => import('../components/SoonCanvas'))

const HomePage: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [collectorsEmail, setCollectorsEmail] = useState<string>('')
  const handleSubscribe = () => console.log(email)

  return (
    <>
      <Head>
        <title>Fine</title>
        <meta
          name="description"
          content="artist-run platform supporting established artists in the NFT space and
            artists entering the NFT space for the first time"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.home}>
        <h1 className={style.stickyF}>F</h1>
        <div className={style.hero}>
          <SoonCanvas />
          <h1 className={style.logo}>INE</h1>
          <div className={style.blank} />
          <div className={cn(style.content, style.container)}>
            <p className={style.textXL}>
              FINE is an artist-run platform supporting established and emerging artists in the NFT
              space. We view the blockchain both as a platform and as a medium.
            </p>
            <p className={style.textXL}>
              We work one-on-one with artists to develop innovative projects and provide the tools
              and the knowledge necessary to do so. We are focused on building a diverse roster of
              artists aligned in their intention to create experimental work and foster a rich
              dialogue within the contemporary visual culture.
            </p>
          </div>
        </div>
        <div>
          <section className={cn(style.when, style.FPadding)}>
            <div className={style.whenWrapper}>
              <div>
                <h3 className={style.subheader}>When?</h3>
                <p className={style.text}>
                  FINE is pleased to announce it will be launching its first season in early 2022.
                  Kindly subscribe to our newsletter to stay updated and receive details on our
                  upcoming launch:
                </p>
              </div>
              <form className={cn(style.inputWrapper, style.overBlack)} onSubmit={handleSubscribe}>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className={style.btn}>
                  SUBSCRIBE
                </button>
              </form>
            </div>
            <div className={style.dateWrapper}>
              <h4 className={style.year}>20</h4>
              <h4 className={style.year}>22</h4>
            </div>
          </section>
        </div>
        <HorizontalScroll>
          <div className={style.joinUs}>
            <div className={style.joinUsSection}>
              <h3 className={style.subheader}>
                Artists <br /> Submissions
              </h3>
              <div>
                <p className={style.text}>
                  We are interested in submissions from artists all around the world who are focused
                  on creating with on-chain technologies and would like to develop projects with us,
                  kindly submit your proposal <Icon icon="arrow-right" />{' '}
                  <a href="https://forms.gle/fJHnHrpvpXn8oA5B9" className={style.link}>
                    here
                  </a>
                  .
                </p>
                <br />
                <p className={style.text}>
                  Submit any submission questions <Icon icon="arrow-right" />{' '}
                  <a
                    href={`mailto:${constants.contactEmail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.link}
                  >
                    here.
                  </a>
                </p>
              </div>
            </div>
            <div className={style.joinUsSection}>
              <h3 className={style.subheader}>Investors</h3>
              <p className={style.text}>
                If you are a strategic investor and would like to grow with us, we are looking for
                long-term partnerships that are willing to be part of a cultural movement utilizing
                blockchain technology.
                <br />
                <br /> <Icon icon="arrow-right" />{' '}
                <a href={`mailto:${constants.contactEmail}`} className={style.link}>
                  Contact us.
                </a>
              </p>
            </div>
            <div className={style.joinUsSection}>
              <h3 className={style.subheader}>Collectors</h3>
              <div>
                <p className={style.text}>
                  We are pleased to share upcoming artist projects, special programming and
                  collectors circle details. Kindly join our email list to stay updated:
                </p>
                <form className={style.inputWrapper} onSubmit={handleSubscribe}>
                  <input
                    placeholder="Email"
                    type="email"
                    value={collectorsEmail}
                    onChange={e => setCollectorsEmail(e.target.value)}
                  />
                  <button type="submit" className={style.btn}>
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </HorizontalScroll>
        <footer className={style.footer}>
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
        </footer>
      </div>
    </>
  )
}

export default HomePage
