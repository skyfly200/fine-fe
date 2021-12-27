import React from 'react'
import Icon from '../Icon'
import RoundButton from '../RoundedButton'
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

        <p className={style.copyright}>Copyright FINE © 2021</p>
      </div>
    </div>
  )
}

export default Footer
