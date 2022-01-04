import { Artwork } from '../../types'
import dynamic from 'next/dynamic'

import style from './style.module.scss'
// import ObjectDisplayer from './ObjectDisplayer'

interface ArtPreviewerProps {
  artwork: Partial<Artwork>
}

const ObjectDisplayer = dynamic(() => import('./ObjectDisplayer'), {
  ssr: false
})

const ArtPreviewer: React.FC<ArtPreviewerProps> = ({ artwork }) => {
  const { type } = artwork

  return <>{artwork.src && <ObjectDisplayer url={artwork.src} />}</>
}

export default ArtPreviewer
