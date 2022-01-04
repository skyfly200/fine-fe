import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import cn from 'classnames'

import Layout from '../../containers/Layout'
import Link from '../../components/Link'
import Icon from '../../components/Icon'
import { Artist, Artwork, IParams, Project, ProjectDetails } from '../../types'

import style from './Project.module.scss'

import { projects, projectsDetails } from '../../fixtures'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../components/Spinner'
import RoundedButton from '../../components/RoundedButton'
import SimpleTable from '../../components/SimpleTable'
import ArtPreviewer from '../../components/ArtPreviewer'

interface ProjectPageProps {
  project: Project
  projectDetails: ProjectDetails
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
        #68
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
            onClick={() => setActive(item)}
          >
            {item.image && (
              <Image
                src={item.image.src}
                height={200}
                width={200}
                layout="responsive"
                alt={`${item.name}-${i}`}
              />
            )}
          </button>
        ))}
      </InfiniteScroll>
    </div>
  )
}

type Menu = 'canvas' | 'about' | 'details' | 'gallery'
const ProjectPage: NextPage<ProjectPageProps> = ({ project, projectDetails }) => {
  const router = useRouter()
  const {
    name,
    about,
    artist: { image, bio }
  } = project
  const { artworks } = projectDetails
  const [active, setActive] = useState<Artwork>(artworks[0])
  const menu: Menu[] = ['canvas', 'about', 'details', 'gallery']
  const details = [
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
    <Layout>
      <div className={style.pageWrapper}>
        <Title title={name} name={project.artist.name} hideOnDesktop />
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
            {about?.map((p, i) => (
              <p key={`about-paragraph-${i}`}>{p}</p>
            ))}
            {bio?.length && (
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
          <Title title={name} name={project.artist.name} hideOnMobile />
          <div className={style.display} id="canvas">
            <div className={style.pieceWrapper}>
              <ArtPreviewer artwork={active} />
              <div className={style.buttonWrapper}>
                <RoundedButton onClick={() => router.push(`/artwork/${active.id}`)}>
                  VIEW DETAILS
                </RoundedButton>
              </div>
            </div>
          </div>
          <div className={style.details} id="details">
            <h3>Details</h3>
            <SimpleTable rows={details} maxWidth />
          </div>
          {artworks && <Gallery items={artworks} setActive={setActive} active={active} />}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams
  const project = projects.find(item => item.id === id)
  const projectDetails = projectsDetails.find(item => item.id === id)

  if (!project) {
    return {
      notFound: true
    }
  }
  return {
    props: { project, projectDetails },
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
