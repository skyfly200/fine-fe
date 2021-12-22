import '../styles/main.scss'
import type { AppProps } from 'next/app'
import ToastProvider from '../containers/ToastProvider'
import Intl from '../containers/Intl'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Intl>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </Intl>
  )
}

export default MyApp
