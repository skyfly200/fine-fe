import { useEffect } from 'react'
import BigLogo, { BigLogoProps } from '../../components/BigLogo'
import BottomNav from '../../components/BottomNav'
import Footer from '../../components/Footer'

interface LayoutProps extends BigLogoProps {
  greyBG?: boolean
  hideLogo?: boolean
}

const Layout: React.FC<LayoutProps> = ({ greyBG, children, showCanvas, hideLogo }) => {
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--bg-grey-color, #e2e3e5)'
  }, [greyBG])

  return (
    <>
      {!hideLogo && <BigLogo showCanvas={showCanvas} />}
      {children}
      <BottomNav />
      <Footer />
    </>
  )
}

export default Layout
