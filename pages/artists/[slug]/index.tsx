import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import client from '../../../client'
import ArtistFullCard from '../../../components/ArtistFullCard'
import ProjectBigCard from '../../../components/ProjectBigCard'
import Layout from '../../../containers/Layout'
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
            <ArtistFullCard artist={artist} />
          </div>
        </div>

        <div className={style.body}>
          <div className={style.about}>
            {artist.bio && (
              <div className="sanity-body">
                <BlockContent
                  blocks={artist.bio}
                  imageOptions={{ w: 680, fit: 'max' }}
                  {...client.config()}
                />
              </div>
            )}
          </div>
          <div className={style.gallery}>
            {projects?.length &&
              projects.map(project => (
                <ProjectBigCard
                  key={project._id}
                  title={project.title}
                  slug={project.slug}
                  galleryImages={project.galleryImages}
                  artistName={artist.name}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(`*[_type == "artist" && defined(slug.current)][].slug.current`)

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true
  }
}

const artistQuery = groq`
*[_type == "artist" && slug.current == $slug][0]
`
const projectQuery = groq`
*[_type == "project" && artist._ref in *[_type=="artist" && name==$artist.name]._id ]{ title, galleryImages, slug, _id }
`
export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const artist = await client.fetch(artistQuery, { slug })
  if (!artist) {
    return {
      notFound: true
    }
  }

  const projects = await client.fetch(projectQuery, { artist })
  return {
    props: {
      artist,
      projects
    },
    revalidate: 10
  }
}

export default ArtistPage
