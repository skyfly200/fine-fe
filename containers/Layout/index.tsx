import { useEffect } from 'react'

import BottomNav from '../../components/BottomNav'
import Footer from '../../components/Footer'
import Logo from '../../components/Logo'

interface LayoutProps {
  greyBG?: boolean
  hideLogo?: boolean
  hideFooter?: boolean
  hideNav?: boolean
}

const Layout: React.FC<LayoutProps> = ({ greyBG, children, hideLogo, hideFooter, hideNav }) => {
  useEffect(() => {
    if (greyBG) document.body.style.backgroundColor = 'var(--grey-color, #e2e3e5)'
  }, [greyBG])

  return (
    <>
      {!hideLogo && <Logo />}
      {children}
      {!hideNav && <BottomNav />}
      {!hideFooter && <Footer />}
    </>
  )
}

export default Layout
