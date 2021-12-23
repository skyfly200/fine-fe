import React from 'react'
import Icon from '../Icon'
import RoundButton from '../RountButton'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.footer} id="footer">
      <div className={style.container}>
        <div className={style.top}>
          <div className={style.social}>
            <button>
              <Icon icon="twitter" size="xl" />
            </button>
            <button>
              <Icon icon="instagram" size="xl" />
            </button>
            <button>
              <Icon icon="discord" size="xl" />
            </button>
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.line} />
          <div className={style.logoWrapper}>
            <span className={style.logo}>FINE</span>
            <p>Copyright FINE © 2021</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
