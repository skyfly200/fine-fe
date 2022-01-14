import { GetStaticProps, NextPage } from 'next'
import ProjectBigCard from '../../components/ProjectBigCard'

import RotatedText from '../../components/RotatedText'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'

import { AdamFerris, Far } from '../../fixtures/artists'
import { dummy, solids } from '../../fixtures/artworks'
import { Project, ProjectDetails } from '../../types'

import style from './style.module.scss'

interface Item extends Project, ProjectDetails {}

interface CollectionProps {
  items: Item[]
}

const Collection: NextPage<CollectionProps> = ({ items }) => (
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
          {items.map((item, i) => (
            <>
              {!(i % 2) ? (
                <>
                  <div className={style.desktopBlank} />
                  <div className={style.desktopBlank} />
                </>
              ) : null}

              <ProjectBigCard key={item.id} item={item} />
              {i % 2 ? (
                <>
                  <div className={style.desktopBlank} />
                  <div className={style.desktopBlank} />
                  <div className={style.desktopBlank} />
                </>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export const getStaticProps: GetStaticProps = () => {
  // TODO: Replace fixture

  const items = [
    {
      id: '1',
      invocations: 500,
      minted: 250,
      type: 'glb',
      artworks: solids,
      name: 'SOLIDS',
      artist: Far
    },
    {
      id: '2',
      invocations: 500,
      minted: 250,
      type: 'glb',
      artworks: dummy,
      name: 'Squares and Triangles',
      artist: AdamFerris
    }
  ]
  return {
    props: { items },
    revalidate: 10 // TODO: currently set to 1 day. Update if required
  }
}

export default Collection
