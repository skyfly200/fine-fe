import classNames from 'classnames'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Icon from '../components/Icon'
import SoonCanvas from '../components/SoonCanvas'

import styles from '../styles/pages/Soon.module.scss'
import { constants, useElementSize } from '../utils'

const Home: NextPage = () => {
  const [email, setEmail] = useState('')
  const [collectorsEmail, setCollectorsEmail] = useState('')
  const [squareRef, { width: FWidth }] = useElementSize()
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
      <div className={styles.wrapper} style={{ position: 'relative' }}>
        <h1 ref={squareRef} className={classNames(styles.logo, styles.f)}>
          F
        </h1>
        <h1 className={styles.logo}>INE</h1>

        <main className={styles.main} style={{ marginLeft: FWidth }}>
          <article className={styles.blank} />
          <article className={styles.whatWeDo}>
            <p className={styles.text}>
              FINE is an artist-run platform supporting established and emerging artists in the NFT
              space. We view the blockchain both as a platform and as a medium.
            </p>
            <p className={styles.text}>
              We work one-on-one with artists to develop innovative projects and provide the tools
              and the knowledge necessary to do so. We are focused on building a diverse roster of
              artists aligned in their intention to create experimental work and foster a rich
              dialogue within the contemporary visual culture.
            </p>
          </article>

          <article className={styles.whenWrapper}>
            <h3 className={styles.subheader}>When?</h3>
            <p className={styles.text}>
              FINE is pleased to announce it will be launching its first season in early 2022.
              Kindly subscribe to our newsletter to stay updated and receive details on our upcoming
              launch:
            </p>
            <form className={styles.inputWrapper} onSubmit={handleSubscribe}>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className={styles.btn}>
                SUBSCRIBE
              </button>
            </form>
          </article>
          <article className={styles.releaseWrapper}>
            <h4 className={styles.year}>20</h4>
            <h4 className={styles.year}>22</h4>
          </article>
          <article className={styles.artistsWrapper}>
            <div className={styles.contentWrapper}>
              <h3 className={styles.subheader}>Artists Submissions</h3>
              <p className={styles.text}>
                We are interested in submissions from artists all around the world who are focused
                on creating with on-chain technologies and would like to develop projects with us,
                kindly submit your proposal <Icon icon="arrow-right" />{' '}
                <a href="https://forms.gle/fJHnHrpvpXn8oA5B9" className={styles.link}>
                  here
                </a>
                .
              </p>
              <p className={styles.text}>
                Submit any submission questions <Icon icon="arrow-right" />{' '}
                <a
                  href={`mailto:${constants.contactEmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  here.
                </a>
              </p>
            </div>
          </article>
          <article className={styles.joinUsWrapper}>
            <div className={styles.joinUsSection}>
              <h3 className={styles.subheader}>Investors</h3>
              <p className={styles.text}>
                If you are a strategic investor and would like to grow with us, we are looking for
                long-term partnerships that are willing to be part of a cultural movement utilizing
                blockchain technology.
                <br /> <Icon icon="arrow-right" />{' '}
                <a href={`mailto:${constants.contactEmail}`} className={styles.link}>
                  Contact us.
                </a>
              </p>
            </div>

            <div className={styles.joinUsSection} />
            <div className={styles.joinUsSection} />
            <div className={styles.joinUsSection}>
              <h3 className={styles.subheader}>Collectors</h3>
              <div>
                <p className={styles.text}>
                  We are pleased to share upcoming artist projects, special programming and
                  collectors circle details. Kindly join our email list to stay updated:
                </p>
                <form className={styles.inputWrapper} onSubmit={handleSubscribe}>
                  <input
                    placeholder="Email"
                    type="email"
                    value={collectorsEmail}
                    onChange={e => setCollectorsEmail(e.target.value)}
                  />
                  <button type="submit" className={styles.btn}>
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
          </article>
        </main>
        <footer className={styles.footer}>
          <div style={{ marginLeft: FWidth }} className={styles.footerContent}>
            <h3 className={styles.subheader}>Join Our Team</h3>
            <p className={styles.text}>
              If you are interested in being part of FINE and feel you have something unique to
              contribute, we would like to hear from you. We are looking to collaborate with
              Curators, Solidity Developers and others. <Icon icon="arrow-right" />{' '}
              <a href={`mailto:${constants.contactEmail}`} className={styles.link}>
                Contact us.
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
