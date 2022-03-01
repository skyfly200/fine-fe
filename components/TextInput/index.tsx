import cn from 'classnames'
import Icon from '../Icon'

import s from './style.module.scss'

type Styles = 'simple' | 'search' | 'submit'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  styleType?: Styles
  onSubmit?: () => void
  submitting?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  styleType = 'simple',
  onSubmit,
  submitting,
  ...inputProps
}) => (
  <div className={s.wrapper}>
    {label && (
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
    )}
    <input id={name} {...inputProps} className={cn(s.input, s[styleType])} />
    {styleType === 'search' && <Icon icon="search" size="xxl" className={s.searchIcon} />}
    {styleType === 'submit' && onSubmit && (
      <button onClick={onSubmit} className={s.submitButton} disabled={submitting}>
        SUBMIT
      </button>
    )}
  </div>
)

export default TextInput
