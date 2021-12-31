import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { FormattedDate } from 'react-intl'
import RotatedText from '../../components/RotatedText'
import Layout from '../../containers/Layout'
import { news } from '../../fixtures'
import { IParams, News } from '../../types'

import style from './style.module.scss'

interface NewsPageProps {
  entry: News
}
const News: NextPage<NewsPageProps> = ({ entry }) => {
  const { title, mainImage, subtitle, createdAt, body } = entry

  return (
    <Layout>
      <div className={style.pageWrapper}>
        <div className={style.imgWrapper}>
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className={style.content}>
          <h1 className={style.title}>{title}</h1>
          <h2 className={style.subtitle}>{subtitle}</h2>
          <div className={style.body}>
            {body.map((p, i) => (
              <p className={style.paragraph} key={`event-p-${i}`}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className={style.date}>
          <RotatedText>
            <FormattedDate value={createdAt} year="numeric" month="long" day="2-digit" />
          </RotatedText>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const entry = news.find(item => item.slug === slug)
  return {
    props: {
      entry
    },
    revalidate: 60 * 60 * 24 // TODO: currently set to 1 day. Update if required
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = news.map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false
  }
}

export default News
