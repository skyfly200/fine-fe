import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BlockContent from '@sanity/block-content-to-react'
import cn from 'classnames'

import Layout from '../../../containers/Layout'
import Icon from '../../../components/Icon'
import { Artwork, IParams, Project, SanityImage } from '../../../types'

import s from './Project.module.scss'
import sc from '../../../styles/components.module.scss'

import { projects } from '../../../fixtures'
import SimpleTable, { Cell } from '../../../components/SimpleTable'
import ArtPreviewer from '../../../components/ArtPreviewer'
import client from '../../../client'
import groq from 'groq'
import { formatDetails } from '../../../utils'
import { useNextSanityImage } from 'next-sanity-image'
import MintButton from '../../../components/MintButton'
import RotatedText from '../../../components/RotatedText'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../../components/Spinner'
import RoundedCheckbox from '../../../components/RoundedCheckbox'

interface PageProject extends Project {
  bioSummary: any
  name: string
  details: Cell[]
  image: SanityImage
}

interface ProjectPageProps {
  project: PageProject
}

interface ArtworkSlideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  artwork: Artwork
  active?: boolean
}
const ArtworkSlide: React.FC<ArtworkSlideProps> = ({ artwork, active, ...props }) => {
  return (
    <button className={cn(s.artworkSlide, { [s.active]: active })} {...props}>
      <Image src={artwork.image.src} alt={`${artwork.id}-image`} layout="fill" objectFit="cover" />
    </button>
  )
}

interface GalleryProps {
  items: Array<Artwork>
  setActive: React.Dispatch<SetStateAction<Artwork>>
  active: Artwork
}

const pageQuantity = 20
const Gallery = ({ items, setActive, active }: GalleryProps) => {
  const [limit, setLimit] = useState<number>(pageQuantity)

  if (!items.length) return <></>
  return (
    <div className={s.galleryWrapper} id="gallery">
      <InfiniteScroll
        dataLength={items.slice(0, limit).length}
        next={() => setLimit(old => old + pageQuantity)}
        hasMore={limit < items.length}
        loader={
          <div className={s.spinnerWrapper}>
            <Spinner />
          </div>
        }
        // endMessage={<h4>Nothing more to show</h4>}
        className={s.gallery}
      >
        {items.slice(0, limit).map((item, i) => (
          <button
            className={cn(s.imageWrapper, { [s.activePiece]: item.id === active.id })}
            key={`${item.name}-${i}`}
            onClick={() => setActive(item)}
          >
            {item.image && (
              <Image
                src={item.image.src}
                height={200}
                width={200}
                layout="responsive"
                alt={item.image.alt}
              />
            )}
          </button>
        ))}
      </InfiniteScroll>
    </div>
  )
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const { title, body, bioSummary, name, artworks, details, image } = project
  const [active, setActive] = useState<Artwork>(artworks[0])

  const [activeColor, setColor] = useState('#FEFEFE')
  const [spotlightOn, setSpotlight] = useState<boolean>(true)
  const [fogOn, setFog] = useState<boolean>(true)
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  const avatarPicture = useNextSanityImage(client, image)
  const artworksSlides = artworks.map(artwork => (
    <ArtworkSlide
      key={artwork.id}
      artwork={artwork}
      onClick={() => setActive(artwork)}
      active={active.id === artwork.id}
    />
  ))
  const projectRows = [
    {
      title: <span className={s.minted}>Minted</span>,
      description: <span className={s.num}>120 of 300</span>
    },
    ...formatDetails(details, ['_key', '_type'])
  ]

  const attributeRows = useMemo(() => {
    return active.attributes.map(att => ({ '1': att.title, '2': att.description }))
  }, [active])

  return (
    <Layout greyBG>
      <div className={s.pageWrapper}>
        <div className={s.left}>
          <div className={s.detailsWrapper}>
            <RotatedText className={s.rotatedCell}>
              <h4 className={sc.h4}>Details</h4>
            </RotatedText>
            <div className={s.tableCell}>
              <SimpleTable rows={projectRows} />
            </div>
            <RotatedText className={cn(s.rotatedCell, s.noBorder)}>
              <h4 className={sc.h4}>Token Attributes</h4>
            </RotatedText>
            <div className={cn(s.tableCell, s.noBorder)}>
              {attributeRows.length ? <SimpleTable rows={attributeRows} /> : <div />}
            </div>
          </div>
          <div className={s.content}>
            <h3>About the project</h3>
            <div className="sanity-body">
              {body && (
                <BlockContent
                  blocks={body}
                  imageOptions={{ w: 680, fit: 'max' }}
                  {...client.config()}
                />
              )}
            </div>
            <div className={s.bio}>
              <h3>About the artist</h3>
              {image && (
                <div className={s.avatar}>
                  <Image layout="responsive" alt={`${name}-image`} {...avatarPicture} />
                </div>
              )}

              <div className="sanity-body">
                {bioSummary && (
                  <BlockContent
                    blocks={bioSummary}
                    imageOptions={{ w: 680, fit: 'max' }}
                    {...client.config()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={s.middle}>
          <div className={s.titleWrapper}>
            <h1 className={cn(s.title, sc.h1)}>{title}</h1>
            <h3 className={sc.h3}>by {name}</h3>
          </div>
          <div className={cn(s.canvasWrapper, { [s.fullScreen]: fullScreen })}>
            <div className={s.sceneControls}>
              <div className={s.controls}>
                <RoundedCheckbox
                  label="SPOTLIGHT"
                  onChange={() => setSpotlight(s => !s)}
                  checked={spotlightOn}
                />
                <RoundedCheckbox label="FOG" onChange={() => setFog(s => !s)} checked={fogOn} />
                <div className={s.colorInputWrapper}>
                  <label htmlFor="colorinput">COLOR</label>
                  <input
                    id="colorinput"
                    type="color"
                    value={activeColor}
                    onChange={e => setColor(e.target.value)}
                  />
                </div>
              </div>
              <button className={s.fullScreenButton} onClick={() => setFullScreen(state => !state)}>
                <Icon icon="full-screen" size="lg" />
              </button>
            </div>
            <ArtPreviewer
              artwork={active}
              withZoom
              activeColor={activeColor}
              fogOn={fogOn}
              spotlightOn={spotlightOn}
            />
          </div>
          <div className={s.bottomWrapper}>
            <div className={s.mintingWrapper}>
              <MintButton onMint={num => console.log('mint', num)}>Mint</MintButton>
            </div>
          </div>
        </div>
        <div className={s.right}>
          {artworks && <Gallery items={artworks} setActive={setActive} active={active} />}
        </div>
      </div>
    </Layout>
  )
}

const query = groq`
  *[_type == "project" && slug.current == $slug]{
    _id,
    title,
    body,    
    details,
    "name": artist->name,
    "bioSummary": artist->bioSummary,
    "image": artist->image,
    }[0]
`
export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const resp = await client.fetch(query, { slug })
  const prj = projects.find(item => item.slug.current === slug) // TODO: update with web3 BE

  if (!resp || !prj?.artworks) {
    return {
      notFound: true
    }
  }
  const project = { ...resp, artworks: prj?.artworks }
  return {
    props: { project },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fetchedPaths = await client.fetch(
    `*[_type == "project" && defined(slug.current)][].slug.current`
  )
  const paths = fetchedPaths.length
    ? fetchedPaths.map((slug: string) => ({ params: { slug } }))
    : []
  return {
    paths,
    fallback: false
  }
}

export default ProjectPage
