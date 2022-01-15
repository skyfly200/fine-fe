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
  if (!artwork.src) return <></>
  return (
    <>
      {artwork.type === 'glb' ? (
        <ObjectDisplayer url={artwork.src} withZoom={withZoom} />
      ) : (
        <div>
          <strong> TODO:</strong> <br /> Create Iframe displayer for three/p5 tokens
        </div>
      )}
    </>
  )
}

export default ArtPreviewer
