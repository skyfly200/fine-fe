import { ChainId, DAppProvider as Provider } from '@usedapp/core'
import { getDappConfig } from './config'

const DappProvider: React.FC = ({ children }) => {
  return <Provider config={getDappConfig()}>{children}</Provider>
}

export default DappProvider
