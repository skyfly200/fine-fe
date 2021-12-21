import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import Layout from '../../containers/Layout'
import Link from '../../components/Link'
import Icon from '../../components/Icon'
import TextInput from '../../components/TextInput'
import { useDebounce } from '../../utils'
import { IParams, Project } from '../../types'

import style from '../../styles/pages/Project.module.scss'

import projects from '../../fixtures/projects'
import InfiniteScroll from 'react-infinite-scroll-component'

interface ProjectPageProps {
  project: Project
}

type HoverActions = 'enter' | 'leave'

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const [limit, setLimit] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const debouncedValue = useDebounce<string>(search, 500)

  const filteredArtworks = useMemo((): Array<any> => {
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
        <div className={cn(style.firstCol, style.col)}>
          <div className={style.contentWrapper}>
            <h1 className={style.title}>{project.name}</h1>
            <div className={style.searchWrapper}>
              <TextInput placeholder="Search..." onChange={e => setSearch(e.target.value)} />
            </div>
            <strong>250/500 minted</strong>
            {/* <div className={style.miniGallery}>
              {filteredArtworks?.map((item, i) => (
                <Link key={`${project.name}-${i}`} href={`#anchor-${item.id}`}>
                  <Image
                    src={item.previewImg.src}
                    height={25}
                    width={25}
                    layout="fixed"
                    alt={`${project.name}-${i}`}
                  />
                </Link>
              ))}
            </div> */}
          </div>
        </div>
        <div className={cn(style.secondCol, style.col)}>
          {filteredArtworks?.length ? (
            <InfiniteScroll
              dataLength={filteredArtworks.slice(0, limit).length}
              next={() => {
                console.log('+10')
                console.log(limit < filteredArtworks.length)
                setLimit(old => old + 10)
              }}
              hasMore={limit < filteredArtworks.length}
              loader={<h3> Loading...</h3>}
              endMessage={<h4>Nothing more to show</h4>}
            >
              {filteredArtworks.slice(0, limit).map((item, i) => (
                <div
                  key={`${project.name}-${i}`}
                  id={`anchor-${item.id}`}
                  className={style.artworkCard}
                >
                  <div className={style.cardImage}>
                    <Link href={`/artwork/${item.id}`}>
                      <Image
                        src={item.previewImg.src}
                        height={500}
                        width={500}
                        layout="responsive"
                        alt={`${project.name}-${i}`}
                      />
                    </Link>
                  </div>
                  <div className={cn(style.cardContent, style.open)}>
                    <div>
                      <h3 className={style.artworkName}>{item.name}</h3>
                      <p>
                        by <strong>Adam Ferris</strong>
                      </p>
                      {item.minted && (
                        <span className={style.price}>
                          <Icon icon="eth" size="md" />
                          {item.mintedPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            'no items'
          )}
        </div>
        <div className={cn(style.lastCol, style.col)}>
          <div className={style.aboutContent}>
            {project.about?.map((item, i) => (
              <p key={`about-paragraph-${i}`}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams
  const project = projects.find(item => item.id === id)
  if (!project) {
    return {
      notFound: true
    }
  }
  return {
    props: { project },
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
