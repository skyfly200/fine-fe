import React from 'react'

import { SrcType, TokenData } from '../../types'

interface CanvasIframeProps {
  baseCode: SrcType
  draw: string
  tokenData?: TokenData
}

const CanvasIframe: React.FC<CanvasIframeProps> = ({ baseCode, draw, tokenData }) => {
  return (
    <iframe
      sandbox="allow-scripts allow-downloads"
      allowFullScreen
      allow="xr-spatial-tracking"
      srcDoc={`
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                    <meta charset="utf-8"/>
                    
                    ${
                      tokenData &&
                      `
                        <script>
                            let tokenData = ${JSON.stringify(tokenData)}
                        </script>
                    `
                    }
               
                    <style type="text/css">
                        html {
                            height: 100%;
                        }
                        body {
                            min-height: 100%;
                            margin: 0;
                            padding: 0;
                        }
                        canvas {
                            padding: 0;
                            margin: auto;
                            display: block;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                        }
                    </style>
                    <body>
                    <script>
                    ${draw}
                    </script>
                    </body>
                </head>
            </html>
        `}
    />
  )
}

export default CanvasIframe
