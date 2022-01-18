import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import ProjectBigCard from '../../../components/ProjectBigCard'
import SocialNetworksList from '../../../components/SocialNetworksList'

import Layout from '../../../containers/Layout'
import { artists, projects } from '../../../fixtures'
import { Artist, IParams, Project } from '../../../types'

import style from './style.module.scss'
interface ArtistPageProps {
  artist: Artist
  projects: Project[]
}

const ArtistPage: NextPage<ArtistPageProps> = ({ artist, projects }) => {
  return (
    <Layout>
      <div className={style.pageWrapper}>
        <div className={style.leftCol}>
          <div className={style.header}>
            <div className={style.headerTop}>
              <div className={style.avatarWrapper}>
                {artist.image && (
                  <Image
                    src={artist.image.src}
                    width={100}
                    height={100}
                    layout="responsive"
                    alt={`${artist.name}-avatar`}
                  />
                )}
              </div>
              <div>
                <h1 className={style.artistName}>{artist.name}</h1>
                <SocialNetworksList socialNetworks={artist.socialNetworks} size="xl" />
              </div>
            </div>
          </div>
        </div>

        <div className={style.body}>
          <div className={style.about}>
            {artist.bio.map(p => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className={style.gallery}>
            {projects?.map(project => (
              <ProjectBigCard key={project.id} item={project} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const artist = artists.find(item => item.slug === slug)
  if (!artist) {
    return {
      notFound: true
    }
  }
  const artistProjects = projects.filter(el => el.artist.slug === slug)

  return {
    props: { artist, projects: artistProjects },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = artists.map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false
  }
}
export default ArtistPage
