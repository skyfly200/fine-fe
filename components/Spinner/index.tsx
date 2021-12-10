import cn from 'classnames'
import style from './style.module.scss'

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const Spinner = ({ size = 'sm' }: SpinnerProps) => (
  <div className={cn(style.spinner, style[size])}>
    <div className={style['double-bounce1']} />
    <div className={style['double-bounce2']} />
  </div>
)

export default Spinner
