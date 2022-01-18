import cn from 'classnames'
import style from './style.module.scss'

type Size = 'sm' | 'md' | 'lg' | 'xl'
type Side = 'right' | 'left' | 'none'
interface RoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size
  lineSide?: Side
  white?: boolean
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  children,
  size = 'md',
  lineSide = 'right',
  white,
  ...buttonProps
}) => {
  return (
    <div className={cn(style.buttonWrapper, { [style.white]: white })}>
      {lineSide === 'left' && <span className={style.line} />}
      <button className={cn(style.button, style[size])} {...buttonProps}>
        {children}
      </button>
      {lineSide === 'right' && <span className={style.line} />}
    </div>
  )
}

export default RoundedButton
