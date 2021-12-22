import type { AppProps } from 'next/app'
import ToastProvider from '../containers/ToastProvider'
import Intl from '../containers/Intl'
import StyleProvider from '../containers/StyleProvider'
import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Intl>
      <ToastProvider>
        <StyleProvider>
          <Component {...pageProps} />
        </StyleProvider>
      </ToastProvider>
    </Intl>
  )
}

export default MyApp
