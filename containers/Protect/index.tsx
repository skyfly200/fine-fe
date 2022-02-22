import { useEffect, useState } from 'react'
import { useKeyPress } from "@react-typed-hooks/use-key-press";

import RoundedButton from '../../components/RoundedButton'
import TextInput from '../../components/TextInput'
import s from './style.module.scss'

const Protect: React.FC = ({ children }) => {
  const [isLogged, setLogged] = useState(false)
  const [err, setErr] = useState('')
  const [pass, setPass] = useState('')
  const handleSubmit = () => pass === process.env.NEXT_PUBLIC_PASS ? setLogged(true) : setErr('Wrong Passwrod')
  const keyboardSubmit = useKeyPress({ targetKey: "Enter" });

  useEffect(() => {
    keyboardSubmit && handleSubmit()
  }, [keyboardSubmit])

  return (
    <>
      {isLogged ? (
        children
      ) : (
        <div className={s.wrapper}>
          <div className={s.container}>
            <TextInput
              type="password"
              name="loggin"
              label="Sign in"
              onChange={e => {
                setErr('')
                setPass(e.target.value)
              }}
            />
            <RoundedButton onClick={handleSubmit}>SUBMIT</RoundedButton>
            <span className={s.err}>{err && err}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Protect
