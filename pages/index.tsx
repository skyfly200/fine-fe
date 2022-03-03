import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import ObjectDisplayer from '../components/ArtPreviewer/ObjectDisplayer'
import FixedSidenav from '../components/FixedSidenav'
import Logo from '../components/Logo'
import Layout from '../containers/Layout'
import TextInput from '../components/TextInput'
import { ToastContext } from '../containers/ToastProvider'

import slimesIMG from '../assets/images/slimes.png'

import s from './Launch.module.scss'
import dynamic from 'next/dynamic'

const menu = ['About', 'Upcoming', 'Submissions']
const DynamicSoonCanvas = dynamic(() => import('../components/SoonCanvas'))

type ProjectCardProps = {
  title: string
  artist: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, artist, children }) => (
  <article className={s.project}>
    <div className={s.content}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <h3 className={s.artist}>by {artist}</h3>
      </div>
    </div>
    {children}
  </article>
)

const Home: NextPage = () => {
  const [activeSection, setActiveSection] = useState(menu[0])
  const aboutRef = useRef(null)
  const upcomingRef = useRef(null)
  const joinUsRef = useRef(null)

  // Intersection Navigation
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setActiveSection(entries[0].target.id)
    }
  }

  const createObserver = useCallback((target: Element, threshold: number = 0.5) => {
    const observer = new IntersectionObserver(handleIntersect, { threshold: threshold })
    observer.observe(target)
  }, [])

  useEffect(() => {
    aboutRef.current && createObserver(aboutRef.current)
    upcomingRef.current && createObserver(upcomingRef.current, 0.09)
    joinUsRef.current && createObserver(joinUsRef.current)
  }, [createObserver])

  // Subscription
  const [email, setEmail] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { notify } = useContext(ToastContext)
  const handleSubscribe = async () => {
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
      console.log(error)
      notify('error', error)
      setIsSubmitting(false)
      return
    }
    notify('success', 'Success! 🎉 You are now subscribed to the newsletter.')

    setEmail('')
    setIsSubmitting(false)
  }

  return (
    <Layout greyBG hideLogo hideNav hideFooter>
      <Head>
        <title>FINE</title>
        <meta
          name="description"
          content="FINE is a cross-functional lab dedicated to guide artists and creatives in their exploration of working in the metasphere."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.pageWrapper}>
        <Logo big />
        <DynamicSoonCanvas />
        <section ref={aboutRef} id={menu[0]} className={s.about}>
          <div className={s.content}>
            <p>
              FINE is a cross-functional lab dedicated to guide artists and creatives in their
              exploration of working in the metasphere.
            </p>
          </div>
        </section>

        <section ref={upcomingRef} id={menu[1]} className={s.upcoming}>
          {/* SOLIDS */}

          <ProjectCard title="SOLIDS" artist="Far">
            <div className={s.bottom}>
              <div className={s.canvasWrapper}>
                <ObjectDisplayer url="/solids/1.glb" noColor withZoom={false} spotlightOn />
              </div>
              <div />
            </div>
          </ProjectCard>

          {/* SLIMES */}
          <div className={s.slime}>
            <ProjectCard title="SLIMES" artist="Adam Ferris">
              <div className={s.bottom}>
                <Image
                  src={slimesIMG}
                  height={1672}
                  width={1746}
                  layout="responsive"
                  alt="slimes image"
                />
                <div className={s.description}>
                  <p>
                    Slimes is a limited edition series of webGL artworks by Adam Ferriss programmed
                    in three.js and GLSL. Slimes are textural explorations, taking advantage of
                    feedback loops and artifacts from the web graphics pipeline to fuel its growth.
                  </p>
                  <p>
                    Every Slime is a unique and generative NFT, that contains its own set of traits
                    and attributes. All features for a slime are generated when the piece is minted,
                    by assigning each piece a series of random values, determined by the hash of the
                    token. The features for slimes have mixed rarities, with some traits expressing
                    themselves more readily than others.
                  </p>
                  <p>
                    These works are best viewed full screen using a desktop computer. It’s
                    recommended to use a modern machine with a dedicated graphics card.
                  </p>
                </div>
              </div>
            </ProjectCard>
          </div>

          {/* CHUNKY MOUSE */}
          <div className={s.chunkyMouse}>
            <ProjectCard title="Chunky Mouse" artist="William Virgil">
              {/* <div className={s.mouseBottom}>
                <Image
                  alt="chunky mouse"
                  src="https://res.cloudinary.com/dhrwv7wvb/image/upload/v1646146839/fine/chunky_f22c4q.webp"
                  layout="responsive"
                  width={2160}
                  height={3840}
                />
                <div className={s.description}>
                  <p>
                    Chunky Mouse is an art collection that explores the inner confines of the one
                    behind the mask. The character embodies what&apos;s genuinely behind the
                    perceived perfection of the mask character. It wears a mask, hiding the truth of
                    who it is while crafting a new narrative and re-tell the story from the point of
                    view of &lsquo;the newly oppressed.&lsquo;
                  </p>
                  <p>Have you ever wondered who&lsquo;s behind the mask?</p>
                  <p>
                    At the time, a character was born. An entertainment hero painted millions of
                    smiles to those who could afford to sit in front of a magic box. His swarthy
                    body jumped, danced, and smiled with a familiar face to those who watched.
                  </p>
                  <p>
                    In a world where blackface was an entertainment trend, A dark skin mascot
                    invaded suburbia to become children&lsquo;s best friends. But if people of color
                    were not allowed in a white home, Have you ever wondered who was behind that
                    chubby whiteface?
                  </p>
                </div>
              </div> */}
            </ProjectCard>
          </div>
        </section>

        <section ref={joinUsRef} id={menu[2]} className={s.join}>
          <article className={s.content}>
            <h3 className={s.title}>
              Artist <br />
              Submissions
            </h3>
            <div className={s.content}>
              <p>
                We are interested in submissions from artists all around the world who are focused
                on creating with on-chain technologies and would like to develop projects with us,
                kindly submit your proposal{' '}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd-RfosRffHfH7eKW5xFFZD6EuOApJUraqeBlsFfigyVame_w/viewform"
                  target="_blank"
                  rel="noreferrer"
                  className={s.link}
                >
                  here
                </a>
                .
              </p>
              <p className={s.footnote}>
                Submit any submission questions{' '}
                <a href="mailto:hello@fine.digital" className={s.link}>
                  here
                </a>
                .
              </p>
            </div>
          </article>
          <article className={s.content}>
            <h4 className={s.title}>Collectors</h4>
            <p>
              We are pleased to share upcoming artist projects, special programming and collectors
              circle details.
            </p>
            <div className={s.submitWrapper}>
              <TextInput
                placeholder="Email..."
                onChange={e => setEmail(e.target.value)}
                value={email}
                styleType="submit"
                onSubmit={handleSubscribe}
                label="Kindly join our email list to stay updated:"
                submitting={isSubmitting}
              />
            </div>
          </article>
          <article className={cn(s.content, s.joinus)}>
            <div className={s.inner}>
              <h4 className={s.title}>Join Our Team</h4>
              <p>
                If you are interested in being part of FINE and feel you have something unique to
                contribute, we would like to hear from you.
              </p>
              <p>
                <a href="mailto:hello@fine.digital" className={s.link}>
                  Contact us
                </a>
              </p>
            </div>
          </article>
        </section>
      </div>
      <FixedSidenav menu={menu} active={activeSection} />
    </Layout>
  )
}

export default Home
