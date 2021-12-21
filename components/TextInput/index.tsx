import cn from 'classnames'

import style from './style.module.scss'

type Styles = 'simple'

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
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <input id={name} {...inputProps} className={cn(style.input, style[styleType])} />
  </div>
)

export default TextInput
