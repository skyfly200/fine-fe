import cn from 'classnames'
import React from 'react'
import style from './style.module.scss'
interface ThreeDotsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean
}

const ThreeDots: React.FC<ThreeDotsProps> = ({ open, ...props }) => (
  <button {...props} className={cn(style.btn, { [style.open]: open })}>
    <span className={style.dots}></span>
  </button>
)

export default ThreeDots
