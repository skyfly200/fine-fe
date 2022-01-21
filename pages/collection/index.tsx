import groq from 'groq'
import { GetStaticProps, NextPage } from 'next'
import { Fragment } from 'react'
import client from '../../client'
import ProjectBigCard from '../../components/ProjectBigCard'

import RotatedText from '../../components/RotatedText'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'
import { projects as items } from '../../fixtures'

import { AdamFerris, Far } from '../../fixtures/artists'
import { dummy, solids } from '../../fixtures/artworks'
import { Project, ProjectDetails } from '../../types'

import style from './style.module.scss'

interface Item extends Partial<Project> {
  name: string
}

interface CollectionProps {
  projects: Item[]
}

const Collection: NextPage<CollectionProps> = ({ projects }) => (
  <Layout greyBG>
    <div className={style.collectionPage}>
      <div className={style.leftCol}>
        <RotatedText>
          <h2 className={style.pageTitle}>Collection</h2>
        </RotatedText>
      </div>
      <div className={style.rightCol}>
        <div className={style.header}>
          <div className={style.intro}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ab perferendis et eos. Iure
            ullam eos natus quaerat facilis veniam sit illo eius voluptate eum.
          </div>
          <div className={style.searchWrapper}>
            <TextInput styleType="search" placeholder="Search..." />
          </div>
        </div>
        <div className={style.body}>
          {projects.map(
            (project, i) =>
              project._id &&
              project.title &&
              project.slug &&
              project.galleryImages &&
              project.name && (
                <Fragment key={project._id}>
                  {!(i % 2) ? (
                    <>
                      <div className={style.desktopBlank} />
                      <div className={style.desktopBlank} />
                    </>
                  ) : null}

                  <ProjectBigCard
                    key={project._id}
                    title={project.title}
                    slug={project.slug}
                    galleryImages={project.galleryImages}
                    artistName={project.name}
                  />
                  {i % 2 ? (
                    <>
                      <div className={style.desktopBlank} />
                      <div className={style.desktopBlank} />
                      <div className={style.desktopBlank} />
                    </>
                  ) : null}
                </Fragment>
              )
          )}
        </div>
      </div>
    </div>
  </Layout>
)

const query = groq`
  *[_type == "project"]{
    _id,
    title,
    slug,
    galleryImages,
    "name": artist->name,
    }
`

export const getStaticProps: GetStaticProps = async context => {
  const projects = await client.fetch(query)

  return {
    props: { projects },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export default Collection
