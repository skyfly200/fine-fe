import { motion } from 'framer-motion'
import groq from 'groq'
import { GetStaticProps, NextPage } from 'next'
import { Fragment, useMemo, useState } from 'react'
import client from '../../client'
import ProjectBigCard from '../../components/ProjectBigCard'

import RotatedText from '../../components/RotatedText'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'
import { banner, fadeIn, opacity } from '../../styles/motionAnimations'
import { Project } from '../../types'
import { useDebounce } from '../../utils'

import style from './style.module.scss'

interface Item extends Partial<Project> {
  name: string
}

interface CollectionProps {
  projects: Item[]
}

const Collection: NextPage<CollectionProps> = ({ projects }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchValue, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const filteredProjects: Item[] = useMemo(() => {
    if (debouncedValue) {
      return projects.filter(project =>
        project.title?.toLowerCase().includes(debouncedValue.toLowerCase())
      )
    }
    return projects
  }, [projects, debouncedValue])

  return (
    <Layout greyBG>
      <motion.div
        variants={banner}
        initial="initial"
        animate="animate"
        className={style.collectionPage}
      >
        <div className={style.leftCol}>
          <RotatedText>
            <h2 className={style.pageTitle}>Collection</h2>
          </RotatedText>
        </div>
        <div className={style.rightCol}>
          <div className={style.header}>
            <motion.div variants={opacity} className={style.intro}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ab perferendis et eos.
              Iure ullam eos natus quaerat facilis veniam sit illo eius voluptate eum.
            </motion.div>
            <motion.div className={style.searchWrapper} variants={opacity}>
              <TextInput
                styleType="search"
                placeholder="Search..."
                onChange={handleChange}
                value={searchValue}
              />
            </motion.div>
          </div>
          <div className={style.body}>
            {filteredProjects.map(
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
      </motion.div>
    </Layout>
  )
}

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
