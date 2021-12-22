import Link from 'next/link'
import Image from 'next/image'

import classNames from 'classnames'

import style from './style.module.scss'
import Icon from '../Icon'

const BigLogo: React.FC = () => (
  <Link href="/">
    <div className={style.logo}>
      <Icon icon="f-logo" size="sm-F" className={style.f} />
      <Icon icon="ine-logo" size="sm-INE" className={style.ine} />
    </div>
  </Link>
)

export default BigLogo
