import cn from 'classnames'
import style from './style.module.scss'

type Size = 'sm' | 'md' | 'lg' | 'xl'
interface RoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ children, size = 'md', ...buttonProps }) => {
  return (
    <div className={style.buttonWrapper}>
      <button className={cn(style.button, style[size])} {...buttonProps}>
        {children}
      </button>
      <span className={style.line} />
    </div>
  )
}

export default RoundedButton
