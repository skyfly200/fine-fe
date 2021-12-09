import type { NextPage } from 'next'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

import style from '../../../styles/pages/Test.module.scss'

const DynamicCanvas = dynamic(() => import('../../../components/SoonCanvas2'))

const ThreeShadersTest: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <DynamicCanvas />
    </div>
  )
}

export default ThreeShadersTest
