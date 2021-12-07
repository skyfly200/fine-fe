import { useState } from 'react'
import Script from 'next/script'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import cn from 'classnames'

import Icon from '../components/Icon'
import NumberBar from '../components/NumberBar'
import { constants } from '../utils'

import style from '../styles/pages/Soon.module.scss'
import SoonCanvas from '../components/SoonCanvas'
const DynamicComponent = dynamic(() => import('../components/SoonCanvas'))
const sections = ['what', 'when', 'artists', 'join us', 'be part']

const Home: NextPage = () => {
  const [email, setEmail] = useState('')
  const [collectorsEmail, setCollectorsEmail] = useState('')
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
      <Script id="vertexShader" type="x-shader/x-vertex">
        {`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix 
              * modelViewMatrix 
              * vec4( position, 1.0 );
          }
      `}
      </Script>

      <Script id="fragmentShader" type="x-shader/x-fragment">
        {`
          uniform float amount;
          uniform sampler2D tDiffuse;
          varying vec2 vUv;

          float random( vec2 p )
          {
            vec2 K1 = vec2(
              23.14069263277926, // e^pi (Gelfond's constant)
              2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
            );
            return fract( cos( dot(p,K1) ) * 12345.6789 );
          }

          void main() {

            vec4 color = texture2D( tDiffuse, vUv );
            vec2 uvRandom = vUv;
            uvRandom.y *= random(vec2(uvRandom.y,amount));
            color.rgb += random(uvRandom)*0.15;
            gl_FragColor = vec4( color  );
          }
      `}
      </Script>
      <NumberBar sections={sections} />
      <DynamicComponent />
      <div className={style.pageWrapper}>
        <h1 className={style.logo}>FINE</h1>
        <h1 className={style.stickyF}>F</h1>

        <section className={cn(style.what, style.FPadding)} id={sections[0]}>
          <div className={style.blank} />
          <div>
            <div>
              <p className={style.text}>
                FINE is an artist-run platform supporting established and emerging artists in the
                NFT space. We view the blockchain both as a platform and as a medium.
              </p>
              <p className={style.text}>
                We work one-on-one with artists to develop innovative projects and provide the tools
                and the knowledge necessary to do so. We are focused on building a diverse roster of
                artists aligned in their intention to create experimental work and foster a rich
                dialogue within the contemporary visual culture.
              </p>
            </div>
          </div>
        </section>
        <section className={cn(style.when, style.FPadding)} id={sections[1]}>
          <div className={style.whenWrapper}>
            <h3 className={style.subheader}>When?</h3>
            <p className={style.text}>
              FINE is pleased to announce it will be launching its first season in early 2022.
              Kindly subscribe to our newsletter to stay updated and receive details on our upcoming
              launch:
            </p>
            <form className={style.inputWrapper} onSubmit={handleSubscribe}>
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
        <section className={style.FPadding} id={sections[2]}>
          <div className={style.artistsWrapper}>
            <div className={style.contentWrapper}>
              <h3 className={style.subheader}>Artists Submissions</h3>
              <p className={style.text}>
                We are interested in submissions from artists all around the world who are focused
                on creating with on-chain technologies and would like to develop projects with us,
                kindly submit your proposal <Icon icon="arrow-right" />{' '}
                <a href="https://forms.gle/fJHnHrpvpXn8oA5B9" className={style.link}>
                  here
                </a>
                .
              </p>
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
        </section>
        <section className={cn(style.joinUsWrapper, style.FPadding)} id={sections[3]}>
          <div className={style.joinUsSection}>
            <h3 className={style.subheader}>Investors</h3>
            <p className={style.text}>
              If you are a strategic investor and would like to grow with us, we are looking for
              long-term partnerships that are willing to be part of a cultural movement utilizing
              blockchain technology.
              <br /> <Icon icon="arrow-right" />{' '}
              <a href={`mailto:${constants.contactEmail}`} className={style.link}>
                Contact us.
              </a>
            </p>
          </div>

          <div className={cn(style.joinUsSection, style.blank)} />
          <div className={cn(style.joinUsSection, style.blank)} />
          <div className={style.joinUsSection}>
            <h3 className={style.subheader}>Collectors</h3>
            <div>
              <p className={style.text}>
                We are pleased to share upcoming artist projects, special programming and collectors
                circle details. Kindly join our email list to stay updated:
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
        </section>
        <footer className={cn(style.footer, style.FPadding)} id={sections[4]}>
          <div className={style.footerContent}>
            <h3 className={style.subheader}>Join Our Team</h3>
            <p className={style.text}>
              If you are interested in being part of FINE and feel you have something unique to
              contribute, we would like to hear from you. We are looking to collaborate with
              Curators, Solidity Developers and others. <Icon icon="arrow-right" />{' '}
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

export default Home
