import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BlockContent from '@sanity/block-content-to-react'
import cn from 'classnames'

import Layout from '../../../containers/Layout'
import Link from '../../../components/Link'
import Icon from '../../../components/Icon'
import { Artwork, IParams, Project, SanityImage } from '../../../types'

import style from './Project.module.scss'

import { projects } from '../../../fixtures'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../../components/Spinner'
import RoundedButton from '../../../components/RoundedButton'
import SimpleTable, { Cell } from '../../../components/SimpleTable'
import ArtPreviewer from '../../../components/ArtPreviewer'
import client from '../../../client'
import groq from 'groq'
import { formatDetails } from '../../../utils'
import { useNextSanityImage } from 'next-sanity-image'

interface PageProject extends Project {
  bioSummary: any
  name: string
  details: Cell[]
  image: SanityImage
}

interface ProjectPageProps {
  project: PageProject
}

interface TitleProps {
  title: string
  name?: string
  hideOnDesktop?: boolean
  hideOnMobile?: boolean
}

const Title = ({ title, name, hideOnDesktop, hideOnMobile }: TitleProps) => (
  <div
    className={cn(style.title, {
      [style.hideOnDesktop]: hideOnDesktop,
      [style.hideOnMobile]: hideOnMobile
    })}
  >
    <div className={style.content}>
      <h1>{title}</h1>
      <h2>by {name}</h2>
      <div className={style.buttonWrapper}>
        <RoundedButton>MINT</RoundedButton>
        <span className={style.number}>#68 / 500</span>
      </div>
    </div>
  </div>
)

interface GalleryProps {
  items: Array<Artwork>
  setActive: React.Dispatch<SetStateAction<Artwork>>
  active: Artwork
}

const pageQuantity = 20
const Gallery = ({ items, setActive, active }: GalleryProps) => {
  const [limit, setLimit] = useState<number>(pageQuantity)
  const handleSelection = (item: Artwork) => {
    setActive(item)

    document?.querySelector('canvas')?.scrollIntoView({
      behavior: 'smooth'
    })
  }
  if (!items.length) return <></>
  return (
    <div className={style.galleryWrapper} id="gallery">
      <h3>Latest tokens</h3>
      <InfiniteScroll
        dataLength={items.slice(0, limit).length}
        next={() => setLimit(old => old + pageQuantity)}
        hasMore={limit < items.length}
        loader={
          <div className={style.spinnerWrapper}>
            <Spinner />
          </div>
        }
        // endMessage={<h4>Nothing more to show</h4>}
        className={style.gallery}
      >
        {items.slice(0, limit).map((item, i) => (
          <button
            className={cn(style.imageWrapper, { [style.activePiece]: item.id === active.id })}
            key={`${item.name}-${i}`}
            onClick={() => handleSelection(item)}
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

type Menu = 'canvas' | 'about' | 'details' | 'gallery'

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const router = useRouter()
  const { title, body, bioSummary, name, artworks, details, image } = project
  const formattedDetails = formatDetails(details, ['_key', '_type'])
  const imageProps = useNextSanityImage(client, image)
  const [active, setActive] = useState<Artwork>(artworks[0])
  const menu: Menu[] = ['canvas', 'about', 'details', 'gallery']

  return (
    <Layout>
      <div className={style.pageWrapper}>
        <Title title={title} name={name} hideOnDesktop />
        <div className={style.menu}>
          {menu.map((item, i) => (
            <Link key={item} href={`#${item}`}>
              <Icon icon={item} size="lg" />
            </Link>
          ))}
        </div>
        <div className={style.columnsLayout}>
          <div className={style.about} id="about">
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

            <div className={style.bio}>
              <h3>About the artist</h3>
              {image && (
                <div className={style.avatar}>
                  <Image layout="responsive" alt={`${name}-image`} {...imageProps} />
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
          <Title title={title} name={name} hideOnMobile />
          <div className={style.display} id="canvas">
            <div className={style.pieceWrapper}>
              <ArtPreviewer artwork={active} withZoom />
              <div className={style.buttonWrapper}>
                <RoundedButton onClick={() => router.push(`/artwork/${active.id}`)}>
                  VIEW DETAILS
                </RoundedButton>
              </div>
            </div>
          </div>
          <div className={style.details} id="details">
            <h3>Details</h3>
            <SimpleTable rows={formattedDetails} maxWidth />
          </div>
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
