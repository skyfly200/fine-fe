import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect, useRef } from 'react'
import Layout from '../../containers/Layout'
import { bigGrainyShape } from '../../components/Draws'

import { useWindowSize } from '../../utils'
import style from '../../styles/pages/artwork.module.scss'
import { Artist, Artwork, IParams } from '../../types'
import artworks from '../../fixtures/artworks'
import CanvasIframe from '../../components/CanvasIframe'
import artists from '../../fixtures/artists'

interface PiecePageProps {
  artwork: Artwork
  artist: Artist
}

const pieceConfig = {
  height: 400,
  width: 280
}

const ArtworkPage: NextPage<PiecePageProps> = ({ artwork, artist }) => {
  console.log(artist)
  const { height, width } = useWindowSize()

  return (
    <Layout hideLogo>
      <div className={style.artwork}>
        <div className={style.gallery}>
          <div
            className={style.canvasWrapper}
            style={{
              height: pieceConfig.height,
              width: pieceConfig.width,
              top: (height - pieceConfig.height) / 2,
              left: (width - pieceConfig.width) / 2,
              marginBottom: (height - pieceConfig.height) / 2
            }}
          >
            <CanvasIframe
              baseCode={artwork.src}
              draw={artwork.script}
              tokenData={artwork.tokenData}
            />
          </div>
          <div style={{ height: `${(height - pieceConfig.height) / 2}px` }} />
          <div className={style.details}>
            <div className={style.artist}>
              <h3 className={style.title}>{artist.name}</h3>
              {artist.bio.map((p, i) => (
                <p key={`bio-paragraph-${i}`} className={style.text}>
                  {p}
                </p>
              ))}
            </div>
            <div className={style.blank} />
            <div className={style.about}>
              <h3 className={style.title}>{artwork.name}</h3>
              {artwork.about.map((p, i) => (
                <p key={`about-paragraph-${i}`} className={style.text}>
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
  if (!artwork) {
    return {
      notFound: true
    }
  }
  const artist = artists.find(item => item.id === artwork.artistId)
  return {
    props: { artwork, artist },
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
