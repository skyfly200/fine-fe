import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import Layout from '../../containers/Layout'
import Link from '../../components/Link'
import Icon from '../../components/Icon'
import TextInput from '../../components/TextInput'
import { useDebounce } from '../../utils'
import { Artist, Artwork, Img, IParams, Project } from '../../types'

import style from './Project.module.scss'

import projects from '../../fixtures/projects'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../components/Spinner'
import RoundedButton from '../../components/RoundedButton'
import artists from '../../fixtures/artists'
import SimpleTable from '../../components/SimpleTable'

interface ProjectPageProps {
  project: Project
  artist: Artist
}

interface TitleProps {
  title: string
  name: string
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
        #68
      </div>
    </div>
  </div>
)

interface AboutProps {
  about: string[]
  bio: string[]
  image?: Img
}

const About = ({ about, bio, image }: AboutProps) => (
  <div className={style.about} id="about">
    {about?.map((p, i) => (
      <p key={`about-paragraph-${i}`}>{p}</p>
    ))}
    {bio.length && (
      <div className={style.bio}>
        <h3>About the artist</h3>

        {image?.src && (
          <div className={style.avatar}>
            <Image
              layout="responsive"
              src={image?.src}
              height={image?.height}
              width={image?.width}
              alt={image?.alt}
            />
          </div>
        )}

        {bio.map((p, i) => (
          <p key={`bio-paragraph-${i}`}>{p}</p>
        ))}
      </div>
    )}
  </div>
)

const Display = ({ id, previewImg }: Partial<Artwork>) => (
  <div className={style.display} id="display">
    <div className={style.pieceWrapper}>
      <Link href={`/artwork/${id}`}>
        {previewImg && (
          <Image
            src={previewImg.src}
            height={200}
            width={200}
            layout="responsive"
            alt="latest-mint-piece"
          />
        )}
      </Link>
    </div>
  </div>
)

const Details = () => {
  const items = [
    {
      title: 'Library',
      detail: 'Three.js'
    },
    {
      title: 'Price',
      detail: (
        <>
          1.1 <Icon icon="eth" />
        </>
      )
    }
  ]
  return (
    <div className={style.details} id="details">
      <h3>Meta</h3>
      <SimpleTable rows={items} maxWidth />
    </div>
  )
}

interface GalleryProps {
  items: Array<Partial<Artwork>>
}

const pageQuantity = 20
const Gallery = ({ items }: GalleryProps) => {
  const [limit, setLimit] = useState<number>(pageQuantity)
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
        endMessage={<h4>Nothing more to show</h4>}
        className={style.gallery}
      >
        {items.slice(0, limit).map((item, i) => (
          <Link key={`${item.name}-${i}`} href={`/artwork/${item.id}`}>
            {item.previewImg && (
              <Image
                src={item.previewImg.src}
                height={200}
                width={200}
                layout="responsive"
                alt={`${item.name}-${i}`}
              />
            )}
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  )
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project, artist }) => {
  const { name, about, artworks } = project
  const { image, bio } = artist

  const [search, setSearch] = useState<string>('') // Backup for search input
  const debouncedValue = useDebounce<string>(search, 500)

  const filteredArtworks = useMemo((): Array<Partial<Artwork>> => {
    if (!debouncedValue && project.artworks) return project.artworks
    const filtered = project.artworks?.filter(proj =>
      proj.name.toLowerCase().includes(debouncedValue.toLowerCase())
    )
    if (!filtered) return []
    return filtered
  }, [project.artworks, debouncedValue])

  return (
    <Layout>
      <div className={style.pageWrapper}>
        <Title title={name} name={artist.name} hideOnDesktop />
        <div className={style.menu}>
          <Link href="#display">
            <Icon icon="canvas" size="lg" />
          </Link>

          <Link href="#about">about</Link>

          <Link href="#details">meta</Link>

          <Link href="#gallery">
            <Icon icon="gallery" size="lg" />
          </Link>
        </div>
        <div className={style.columnsLayout}>
          <About about={about} bio={bio} image={image} />
          <Title title={name} name={artist.name} hideOnMobile />
          <Display id={filteredArtworks[0].id} previewImg={filteredArtworks[0].previewImg} />
          <Details />
          <Gallery items={filteredArtworks} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams
  const project = projects.find(item => item.id === id)
  const artist = artists[0]
  if (!project) {
    return {
      notFound: true
    }
  }
  return {
    props: { project, artist },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: false
  }
}

export default ProjectPage
