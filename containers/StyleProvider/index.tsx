import { useEffect } from 'react'

const StyleProvider: React.FC = ({ children }) => {
  const addVH = () =>
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)

  useEffect(() => {
    if (typeof window === undefined) return
    addVH()
    window.addEventListener('resize', addVH)
    return () => window.removeEventListener('resize', addVH)
  }, [])
  return <>{children}</>
}

export default StyleProvider
