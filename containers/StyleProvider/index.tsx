import { useEffect } from 'react'

const StyleProvider: React.FC = ({ children }) => {
  const addVar = () =>
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)

  useEffect(() => {
    if (typeof window === undefined) return
    addVar()
    window.addEventListener('resize', addVar)
    return () => window.removeEventListener('resize', addVar)
  }, [])
  return <>{children}</>
}

export default StyleProvider
