import React from 'react'
import RotatedText from '../../components/RotatedText'
import TextInput from '../../components/TextInput'
import Layout from '../../containers/Layout'
import SideSearch from '../../containers/Layout/SideSearch'

import style from './style.module.scss'

const Collections = () => {
  return (
    <Layout greyBG>
      <div className={style.collectionsPage}>
        <div className={style.leftCol}>
          <RotatedText>
            <h2 className={style.pageTitle}>Collections</h2>
          </RotatedText>
        </div>
        <div className={style.header}>
          <div className={style.intro}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ab perferendis et eos. Iure
            ullam eos natus quaerat facilis veniam sit illo eius voluptate eum.
          </div>
          <div className={style.searchWrapper}>
            <TextInput styleType="search" placeholder="Search..." />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Collections
