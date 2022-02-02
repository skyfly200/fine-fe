import React from 'react'
import { constants } from '../../utils'
import Icon from '../Icon'
import RoundButton from '../RoundedButton'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.footer} id="footer">
      <div className={style.container}>
        <div className={style.top}>
          <h1 className={style.logo}>FINE</h1>
          <p className={style.description}>
            FINE is an artist-run platform supporting established and emerging artists within the
            NFT space and metaverse(s).
          </p>
        </div>
        <div className={style.bottom}>
          <p className={style.copyright}>Copyright FINE © 2021</p>
          <div className={style.linksWrapper}>
            <a className={style.docLink} href="/terms.pdf" download="terms-and-conditions">
              Terms and Conditions
            </a>
            <a className={style.docLink} href="/terms.pdf" download="privacy-policy">
              Privacy Policy
            </a>
          </div>

          <div className={style.social}>
            <button onClick={() => window.open(constants.twitter, '_newtab')}>
              <Icon icon="twitter" size="xl" />
            </button>
            <button onClick={() => window.open(constants.instagram, '_newtab')}>
              <Icon icon="instagram" size="xl" />
            </button>
            <button onClick={() => window.open(constants.discord, '_newtab')}>
              <Icon icon="discord" size="xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
