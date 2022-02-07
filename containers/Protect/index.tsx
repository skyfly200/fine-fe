import { useState } from 'react'
import RoundedButton from '../../components/RoundedButton'
import TextInput from '../../components/TextInput'
import style from './style.module.scss'

const Protect: React.FC = ({ children }) => {
  const [isLogged, setLogged] = useState(false)
  const [pass, setPass] = useState('')
  const handleSubmit = () => pass === process.env.NEXT_PUBLIC_PASS && setLogged(true)

  return (
    <>
      {isLogged ? (
        children
      ) : (
        <div className={style.wrapper}>
          <div className={style.container}>
            <TextInput
              type="password"
              name="loggin"
              label="Sign in"
              onChange={e => setPass(e.target.value)}
            />
            <RoundedButton onClick={handleSubmit}>SUBMIT</RoundedButton>
          </div>
        </div>
      )}
    </>
  )
}

export default Protect
