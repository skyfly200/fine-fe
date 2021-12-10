import cn from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import Spinner from '../Spinner'
import style from './style.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  overBlack?: boolean
  loading?: boolean
  text: string
}

const Button: React.FC<ButtonProps> = ({ overBlack, text, loading, ...buttonProps }) => (
  <button
    {...buttonProps}
    className={cn(style.btn, {
      [style.overBlack]: overBlack
    })}
    disabled={loading || buttonProps.disabled}
  >
    {loading ? <Spinner /> : text}
  </button>
)

export default Button
