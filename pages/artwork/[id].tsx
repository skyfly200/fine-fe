import { useEffect, useState } from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import BlockContent from '@sanity/block-content-to-react'
import useDimensions from 'react-cool-dimensions'
import cn from 'classnames'
import groq from 'groq'

import { Artist, Artwork, IParams, Project } from '../../types'
import Layout from '../../containers/Layout'
import Link from '../../components/Link'
import CanvasStickyWrapper from '../../components/CanvasStickyWrapper'
import ArtPreviewer from '../../components/ArtPreviewer'
import SimpleTable from '../../components/SimpleTable'
import ArtistFullCard from '../../components/ArtistFullCard'
import RoundedButton from '../../components/RoundedButton'
import client from '../../client'

import { artworks } from '../../fixtures'
import style from './Artwork.module.scss'

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
              <h3 className={style.title}>{artwork?.name}</h3>{' '}
              <div>
                <div className={style.projectButton}>
                  <RoundedButton
                    lineSide="left"
                    onClick={() => router.push(`/collection/${project?.slug?.current}`)}
                  >
                    <span className={style.projectButtonText}>
                      <strong>{project?.title}</strong>
                    </span>
                  </RoundedButton>
                </div>
                {project?.body && (
                  <div className="sanity-body">
                    <BlockContent
                      blocks={project.body}
                      imageOptions={{ w: 680, fit: 'max' }}
                      {...client.config()}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={style.blank} />
            <div className={style.attributes}>
              <div className={style.contentWrapper}>
                {artwork?.attributes && (
                  <div className={style.tableWrapper}>
                    <h4 className={style.subtitle}>Attributes</h4>
                    <SimpleTable rows={artwork.attributes} white />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={style.artist}>
          <div className={style.blank} />
          <div className={style.artistContent}>
            <h4 className={style.subtitle}>About the artist</h4>
            <ArtistFullCard artist={artist} className={style.artistCard} />
            {artist?.bioSummary && (
              <div className={style.bio}>
                <div className="sanity-body">
                  <BlockContent
                    blocks={artist.bioSummary}
                    imageOptions={{ w: 680, fit: 'max' }}
                    {...client.config()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

const projectQuery = groq`*[_type == "project" && slug.current == $slug]{title, body, slug}[0]`
const artistQuery = groq`*[_type == "artist" && slug.current == $slug][0]`

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams
  const artwork = artworks.find(item => item.id === id) // TODO: update with web3 BE
  if (!artwork?.artist.slug?.current || !artwork?.project.slug?.current) {
    return {
      notFound: true
    }
  }

  const project = await client.fetch(projectQuery, { slug: artwork.project.slug.current })
  const artist = await client.fetch(artistQuery, { slug: artwork.artist.slug.current })

  if (!project || !artist) {
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
