import Link from 'next/link'
import navLinks from './navLinks'

import style from './style.module.scss'
import cn from 'classnames'
import Icon from '../Icon'

const BottomNav = () => {
  const handleContactClick = () =>
    window?.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

  return (
    <div className={style.nav}>
      {/* TODO: Connect Wallet */}
      <div className={style.wallet}>CONNECT</div>
      <div className={style.logo}></div>
      <ul className={style.menu}>
        {navLinks.map(link => (
          <Link key={link.name} href={link.path} passHref>
            <li className={style.menuItem}>{link.name}</li>
          </Link>
        ))}
        <li className={style.menuItem} onClick={handleContactClick}>
          Contact
        </li>
      </ul>
    </div>
  )
}

export default BottomNav
