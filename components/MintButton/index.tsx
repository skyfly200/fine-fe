import React, { useMemo, useState } from 'react'
import Icon from '../Icon'
import RoundedButton from '../RoundedButton'

import s from './style.module.scss'

interface MintButtonProps {
  onMint: (num: number) => void
}

const MAX_MINTING = 5

const MintButton: React.FC<MintButtonProps> = ({ onMint }) => {
  const [count, setCount] = useState<number>(1)

  return (
    <button className={s.button} onClick={() => onMint(count)}>
      <span className={s.count}> MINT</span>
      <div className={s.counter}>
        <span className={s.num}> {count}</span>
        <div className={s.controls}>
          <button
            onClick={e => {
              e.stopPropagation()
              setCount(c => c + 1)
            }}
          >
            <Icon icon="chevron-up" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              setCount(c => (c > 1 ? c - 1 : 1))
            }}
          >
            <Icon icon="chevron-down" />
          </button>
        </div>
      </div>
    </button>
  )
}

export default MintButton
