import cn from 'classnames'
import style from './style.module.scss'

interface DotButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean
}

const DotButton: React.FC<DotButtonProps> = ({ selected, ...btnProps }) => (
  <button
    className={cn(style.emblaDot, { [style.selected]: selected })}
    type="button"
    {...btnProps}
  />
)

export default DotButton
