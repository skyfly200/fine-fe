import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Icon from '../Icon'

import style from './style.module.scss'

interface AccordionProps {
  header: React.ReactNode
  className?: string
  initialState?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
  header,
  children,
  className,
  initialState = false
}) => {
  const [open, setOpen] = useState(initialState)

  return (
    <div className={cn(style.accordion, className)}>
      <div className={style.top} onClick={() => setOpen(state => !state)}>
        <div className={style.header}>{header}</div>
        <button>
          <Icon icon={open ? 'chevron-up' : 'chevron-down'} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
