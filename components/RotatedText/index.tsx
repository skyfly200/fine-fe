import cn from 'classnames'
import style from './style.module.scss'

interface RotatedTextProps {
  removeWidth?: boolean
  className?: string
  center?: boolean
}

const RotatedText: React.FC<RotatedTextProps> = ({ children, removeWidth, className, center }) => (
  <div className={cn(style.rotatedWrapper, className)} style={{ width: removeWidth ? '' : '50px' }}>
    <div className={cn(style.wrapper, { [style.center]: center })}>{children}</div>
  </div>
)

export default RotatedText
