import cn from 'classnames'
import style from './style.module.scss'

type Size = 'sm' | 'md' | 'lg' | 'xl'
type Side = 'right' | 'left'
interface RoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size
  lineSide?: Side
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  children,
  size = 'md',
  lineSide = 'right',
  ...buttonProps
}) => {
  return (
    <div className={style.buttonWrapper}>
      {lineSide === 'left' && <span className={style.line} />}
      <button className={cn(style.button, style[size])} {...buttonProps}>
        {children}
      </button>
      {lineSide === 'right' && <span className={style.line} />}
    </div>
  )
}

export default RoundedButton
