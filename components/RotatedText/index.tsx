import cn from 'classnames'
import style from './style.module.scss'

interface RotatedTextProps {
  removeWidth?: boolean
  className?: string
}

const RotatedText: React.FC<RotatedTextProps> = ({ children, removeWidth, className }) => (
  <div className={cn(style.rotatedWrapper, className)} style={{ width: removeWidth ? '' : '50px' }}>
    <div className={style.wrapper}>{children}</div>
  </div>
)

export default RotatedText
