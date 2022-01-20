import cn from 'classnames'
import style from './style.module.scss'

interface RoundedCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode
}

const RoundedCheckbox: React.FC<RoundedCheckboxProps> = ({
  label,
  checked,
  id,
  ...checkboxProps
}) => {
  return (
    <label htmlFor={id} className={style.container}>
      {label}
      <input type="checkbox" id={id} className={style.input} {...checkboxProps} checked={checked} />
      <span className={cn(style.checkmark, { [style.checked]: checked })} />
    </label>
  )
}

export default RoundedCheckbox
