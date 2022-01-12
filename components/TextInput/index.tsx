import cn from 'classnames'
import Icon from '../Icon'

import style from './style.module.scss'

type Styles = 'simple' | 'search'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  styleType?: Styles
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  styleType = 'simple',
  ...inputProps
}) => (
  <div className={style.wrapper}>
    {label && <label htmlFor={name}>{label}</label>}
    <input id={name} {...inputProps} className={cn(style.input, style[styleType])} />
    {styleType === 'search' && <Icon icon="search" size="xxl" className={style.searchIcon} />}
  </div>
)

export default TextInput
