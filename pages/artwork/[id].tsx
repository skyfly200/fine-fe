import { useEffect, useState } from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useDimensions from 'react-cool-dimensions'

import { Artist, Artwork, IParams, Project } from '../../types'
import Layout from '../../containers/Layout'

import Link from '../../components/Link'
import CanvasStickyWrapper from '../../components/CanvasStickyWrapper'
import ArtPreviewer from '../../components/ArtPreviewer'
import SimpleTable from '../../components/SimpleTable'
import ArtistFullCard from '../../components/ArtistFullCard'
import RoundedButton from '../../components/RoundedButton'

import { projects, artists, artworks } from '../../fixtures'
import style from './Artwork.module.scss'
import cn from 'classnames'

interface PiecePageProps {
  artwork: Artwork
  artist: Artist
  project: Partial<Project>
}

const ArtworkPage: NextPage<PiecePageProps> = ({ artwork, artist, project }) => {
  const [fullScreen, setFullScreen] = useState(false)
  const { observe, width } = useDimensions<HTMLDivElement>()
  const router = useRouter()
  useEffect(() => {
    fullScreen && window?.scrollTo({ top: 0, behavior: 'smooth' })
    document.body.style.overflow = fullScreen ? 'hidden' : 'unset'
  }, [fullScreen])
  return (
    <Layout>
      <div className={style.artwork}>
        <div className={cn(style.gallery, { [style.fullScreen]: fullScreen })} ref={observe}>
          <CanvasStickyWrapper
            size={artwork.size}
            wrapperWidth={width}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            controls={
              <div className={style.controls}>
                <Link href="#details">
                  <RoundedButton lineSide="none">view details</RoundedButton>
                </Link>
                <RoundedButton lineSide="none" onClick={() => setFullScreen(true)}>
                  full screen
                </RoundedButton>
              </div>
            }
          >
            <ArtPreviewer artwork={artwork} withZoom={fullScreen} />
          </CanvasStickyWrapper>
          <div className={style.details} id="details">
            <div className={style.about}>
              <h3 className={style.title}>{artwork.name}</h3>{' '}
              <div>
                <div className={style.projectButton}>
                  <RoundedButton
                    lineSide="left"
                    onClick={() => router.push(`/collection/${project.slug}`)}
                  >
                    <span className={style.projectButtonText}>
                      <strong>{project.name}</strong>
                    </span>
                  </RoundedButton>
                </div>
                {project.about?.map((p, i) => (
                  <p key={`project-paragraph-${i}`} className={style.text}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className={style.blank} />
            <div className={style.attributes}>
              <div className={style.contentWrapper}>
                <div className={style.tableWrapper}>
                  <h4 className={style.subtitle}>Attributes</h4>
                  <SimpleTable rows={artwork.attributes} white />
                </div>
                <div>
                  <h4 className={style.subtitle}>Other artworks from the collection</h4>

                  <div className={style.carouselWrapper}>
                    {project.artworks?.map((item, i) => (
                      <Link key={`artwork-${i}`} href={`/artwork/${item.id}`}>
                        <div className={style.imageWrapper}>
                          <Image
                            src={item.image.src}
                            height={200}
                            width={200}
                            layout="responsive"
                            alt={`${item.name}-${i}`}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.artist}>
          <div className={style.blank} />
          <div className={style.artistContent}>
            <h4 className={style.subtitle}>About the artist</h4>
            <ArtistFullCard artist={artist} className={style.artistCard} />
            <div className={style.bio}>
              {artist?.bio?.map((p, i) => (
                <p key={`bio-paragraph-${i}`} className={style.text}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams
  const artwork = artworks.find(item => item.id === id)
  const artist = artists.find(item => item.id === artwork?.artistId) ?? {}
  const fullProject = projects.find(proj => proj.id === artwork?.project.id)
  const project = fullProject && {
    name: fullProject.name,
    about: fullProject.about,
    slug: fullProject.slug,
    artworks: fullProject.artworks.slice(0, 10)
  }

  if (!artwork || !artist || !project) {
    return {
      notFound: true
    }
  }

  return {
    props: { artwork, artist, project },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = artworks.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: false
  }
}

export default ArtworkPage
