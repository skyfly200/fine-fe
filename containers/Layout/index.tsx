import { useEffect } from 'react'
import BigLogo from '../../components/BigLogo'
import BottomNav from '../../components/BottomNav'
import Footer from '../../components/Footer'

interface LayoutProps {
  greyBG?: boolean
  hideLogo?: boolean
}

const Layout: React.FC<LayoutProps> = ({ greyBG, children, hideLogo }) => {
  useEffect(() => {
    if (greyBG) document.body.style.backgroundColor = 'var(--grey-color, #e2e3e5)'
  }, [greyBG])

  return (
    <>
      {!hideLogo && <BigLogo />}
      {children}
      <BottomNav />
      <Footer />
    </>
  )
}

export default Layout
