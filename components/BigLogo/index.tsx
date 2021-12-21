import Link from 'next/link'
import Image from 'next/image'

import classNames from 'classnames'

import style from './style.module.scss'

const BigLogo: React.FC = () => (
  <div className={style.logo}>
    <Link href="/" passHref>
      <>
        <span className={style.f}>F</span>
        {/* <span className={style.ine}>INE</span> */}
      </>
    </Link>
  </div>
)

export default BigLogo
