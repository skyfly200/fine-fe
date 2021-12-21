import cn from 'classnames'
import style from './style.module.scss'

type Size = 'sm' | 'md' | 'lg' | 'xl'
interface RountButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size
}

const RoundButton: React.FC<RountButtonProps> = ({ children, size = 'md', ...buttonProps }) => {
  return (
    <div className={style.buttonWrapper}>
      <button className={cn(style.button, style[size])} {...buttonProps}>
        {children}
      </button>
      <span className={style.line} />
    </div>
  )
}

export default RoundButton
