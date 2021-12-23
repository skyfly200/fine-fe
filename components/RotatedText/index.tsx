import style from './style.module.scss'

interface RotatedTextProps {
  removeWidth?: boolean
}

const RotatedText: React.FC<RotatedTextProps> = ({ children, removeWidth }) => (
  <div className={style.rotatedWrapper} style={{ width: removeWidth ? '' : '50px' }}>
    <div className={style.wrapper}>{children}</div>
  </div>
)

export default RotatedText
