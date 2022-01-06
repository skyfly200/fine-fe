import { Mainnet, Config } from '@usedapp/core'

export const getDappConfig = (): Config => ({
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  }
})
