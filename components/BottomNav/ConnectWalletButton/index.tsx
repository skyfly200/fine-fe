import { useRef, useState } from 'react'
import { useEtherBalance, useEthers, shortenAddress } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'

import Icon from '../../Icon'
import style from './style.module.scss'
import RoundedButton from '../../RoundedButton'
import { useOnClickOutside } from '../../../utils'

const ConnectWalletButton = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account)
  const [isPanelOpen, setPanelState] = useState(false)
  const panelRef = useRef(null)
  const btnRef = useRef(null)
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (account) {
      setPanelState(state => !state)
      e.stopPropagation()
      return
    }
    activateBrowserWallet()
  }
  const disconnect = () => {
    deactivate()
    setPanelState(false)
  }
  useOnClickOutside(panelRef, () => setPanelState(false))

  return (
    <div className={style.wallet}>
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            ref={panelRef}
            className={cn(style.panel)}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ bounce: 0 }}
          >
            <div className={style.panelHeader}>
              <h3 className={style.title}>Wallet</h3>
              <RoundedButton lineSide="left" onClick={disconnect}>
                DICONNECT
              </RoundedButton>
            </div>
            <div className={style.content}>
              {account && (
                <div>
                  <h4 className={style.panelSubheader}>Account:</h4>{' '}
                  <div className={style.number}>{account}</div>
                </div>
              )}
              {etherBalance && (
                <div>
                  <h4 className={style.panelSubheader}>Balance:</h4>

                  <div className={style.number}>
                    <Icon icon="eth" /> {formatEther(etherBalance)}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={style.outerCircle}>
        <span className={cn(style.innerCircle, { [style.connected]: !!account })} />
      </div>{' '}
      <button ref={btnRef} className={style.btn} onClick={handleButtonClick}>
        {account ? (
          <div className={style.btnContent}>
            {shortenAddress(account)}{' '}
            <Icon className={style.icon} icon={isPanelOpen ? 'chevron-down' : 'chevron-up'} />
          </div>
        ) : (
          'CONNECT WALLET'
        )}
      </button>
    </div>
  )
}

export default ConnectWalletButton
