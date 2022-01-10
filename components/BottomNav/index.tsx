import Link from 'next/link'
import navLinks from './navLinks'

import style from './style.module.scss'
import cn from 'classnames'
import Icon from '../Icon'
import ConnectWalletButton from './ConnectWalletButton'
import { useState } from 'react'
import ThreeDots from './ThreeDots'

const BottomNav = () => {
  const [open, setOpen] = useState(false)
  const handleContactClick = () =>
    window?.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

  return (
    <div className={cn(style.navWrapper, { [style.open]: open })}>
      <nav className={style.nav}>
        {/* TODO: Connect Wallet */}
        <ConnectWalletButton />

        <ul className={style.menu}>
          {navLinks.map(link => (
            <Link key={link.name} href={link.path} passHref scroll>
              <li className={style.menuItem}>{link.name}</li>
            </Link>
          ))}
          <li className={style.menuItem} onClick={handleContactClick}>
            Contact
          </li>
        </ul>

        <div className={style.menuBtn}>
          <ThreeDots open={open} onClick={() => setOpen(state => !state)} />
        </div>
      </nav>
    </div>
  )
}

export default BottomNav
