import type { AppProps } from 'next/app'
import DappProvider from '../containers/DappProvider'
import IntlProvider from '../containers/IntlProvider'
import Protect from '../containers/Protect'
import StyleProvider from '../containers/StyleProvider'
import ToastProvider from '../containers/ToastProvider'

import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Protect>
      <DappProvider>
        <IntlProvider>
          <ToastProvider>
            <StyleProvider>
              <Component {...pageProps} />
            </StyleProvider>
          </ToastProvider>
        </IntlProvider>
      </DappProvider>
    </Protect>
  )
}

export default MyApp
