import React from 'react'
import { draw1 } from '../../fixtures/draws'
import { Artwork } from '../../types'

interface IframeGeneratorProps {
  artwork: Artwork
}

const IframeGenerator: React.FC<IframeGeneratorProps> = ({ artwork }) => {
  const html = `<!DOCTYPE html><html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script><script>let tokenData = {"tokenId":"197000303","hash":"0xae336bd892309b57ccad42d497c5bfac41d3c08d1993b29664adff49de3b2854"}</script><script>${draw1}</script><style type="text/css">html {  height: 100%;}body { min-height: 100%;  margin: 0;  padding: 0;}canvas {  padding: 0;  margin: auto;  display: block;  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;}</style></head><body></body></html>`
  return (
    <iframe
      sandbox="allow-scripts allow-downloads"
      scrolling="no"
      allow="xr-spatial-tracking"
      allowFullScreen
      style={{
        width: '100%',
        height: '100%'
      }}
      srcDoc={html}
    />
  )
}

export default IframeGenerator
