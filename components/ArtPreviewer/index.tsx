import { Artwork } from '../../types'
import dynamic from 'next/dynamic'

import style from './style.module.scss'
import Spinner from '../Spinner'
import IframeGenerator from './IframeGenerator'

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
  if (!artwork.src) return <></>
  return (
    <>
      {artwork.type === 'glb' ? (
        <ObjectDisplayer url={artwork.src} withZoom={withZoom} />
      ) : (
        <IframeGenerator artwork={artwork} />
      )}
    </>
  )
}

export default ArtPreviewer
