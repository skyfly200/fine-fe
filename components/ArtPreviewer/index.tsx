import { Artwork } from '../../types'
import dynamic from 'next/dynamic'

import style from './style.module.scss'
import Spinner from '../Spinner'

interface ArtPreviewerProps {
  artwork: Artwork
  withZoom?: boolean
}

const ObjectDisplayer = dynamic(() => import('./ObjectDisplayer'), {
  ssr: false,
  loading: () => (
    <div className={style.loaderWrapper}>
      <Spinner />
    </div>
  )
})

const ArtPreviewer: React.FC<ArtPreviewerProps> = ({ artwork, withZoom }) => {
  const { type } = artwork

  return <>{artwork.src && <ObjectDisplayer url={artwork.src} withZoom={withZoom} />}</>
}

export default ArtPreviewer
