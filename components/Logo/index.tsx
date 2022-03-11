import Link from 'next/link'
import Image from 'next/image'

import classNames from 'classnames'

import s from './style.module.scss'
import Icon from '../Icon'

type LogoProps = {
  big?: boolean
}

const Logo: React.FC<LogoProps> = ({ big }) =>
  big ? (
    <Link href="/" passHref>
      <div className={s.biglogo}>
        <Icon icon="f-logo" size="F" className={s.stickyF} />
        <Icon icon="ine-logo" size="INE" className={s.ine} />
      </div>
    </Link>
  ) : (
    <Link href="/" passHref>
      <div className={s.logo}>
        <Icon icon="f-logo" size="sm-F" className={s.f} />
        <Icon icon="ine-logo" size="sm-INE" className={s.ine} />
      </div>
    </Link>
  )

export default Logo
