import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { FormattedDate } from 'react-intl'
import BlockContent from '@sanity/block-content-to-react'

import client from '../../client'
import RotatedText from '../../components/RotatedText'
import Layout from '../../containers/Layout'
import { IParams, News } from '../../types'

import style from './style.module.scss'

interface NewsPageProps {
  entry: News
}
const News: NextPage<NewsPageProps> = ({ entry }) => {
  const { title, mainImage, subtitle, publishedAt, body } = entry
  const imageProps = useNextSanityImage(client, mainImage)
  console.log(imageProps)
  return (
    <Layout>
      <div className={style.pageWrapper}>
        <div className={style.imgWrapper}>
          <Image
            {...imageProps}
            alt="post main image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className={style.content}>
          <h1 className={style.title}>{title}</h1>
          <h2 className={style.subtitle}>{subtitle}</h2>
          <div className="sanity-body">
            <BlockContent
              blocks={body}
              imageOptions={{ w: 680, fit: 'max' }}
              {...client.config()}
            />
          </div>
        </div>
        <div className={style.date}>
          <RotatedText>
            <FormattedDate value={publishedAt} year="numeric" month="long" day="2-digit" />
          </RotatedText>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const entry = await client.fetch(
    `
  *[_type == "post" && slug.current == $slug][0]
`,
    { slug }
  )
  return {
    props: {
      entry
    },
    revalidate: 60 * 60 * 24 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(`*[_type == "post" && defined(slug.current)][].slug.current`)

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true
  }
}

export default News
