import '../styles/main.scss'
import type { AppProps } from 'next/app'
import ToastProvider from '../containers/ToastProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )
}

export default MyApp
