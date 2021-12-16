import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import cn from 'classnames'

import { Artist, Artwork, IParams } from '../../types'
import Layout from '../../containers/Layout'
import CanvasIframe from '../../components/CanvasIframe'

import { useWindowSize } from '../../utils'
import artworks from '../../fixtures/artworks'
import artists from '../../fixtures/artists'
import style from '../../styles/pages/Artwork.module.scss'
import Link from '../../components/Link'
import Icon from '../../components/Icon'

interface PiecePageProps {
  artwork: Artwork
  artist: Artist
}

const pieceConfig = {
  height: 400,
  width: 280
}

const ArtworkPage: NextPage<PiecePageProps> = ({ artwork, artist }) => {
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
              <div className={style.contentWrapper}>
                <h3 className={cn(style.title)}>{artist.name}</h3>
                {artist.bio.map((p, i) => (
                  <p key={`bio-paragraph-${i}`} className={style.text}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className={style.blank} />
            <div className={style.about}>
              <h3 className={style.title}>{artwork.name}</h3>
              <Link href="/">
                <p className={cn(style.subtitle, style.backButton)}>
                  <Icon icon="arrow-left" /> Collection X
                </p>
              </Link>
              {artwork.about.map((p, i) => (
                <p key={`about-paragraph-${i}`} className={style.text}>
                  {p}
                </p>
              ))}
              <h4 className={style.subtitle}>Attributes:</h4>
              <ul>
                {artwork.attributes.map((att, i) => (
                  <li key={`about-paragraph-${i}`} className={style.text}>
                    {Object.keys(att)[0]}: {att[Object.keys(att)[0]]}
                  </li>
                ))}
              </ul>
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
