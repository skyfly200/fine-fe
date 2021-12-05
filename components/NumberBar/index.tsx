import { useMemo, useState } from 'react'
import classNames from 'classnames'
import Scrollspy from 'react-scrollspy'
import style from './style.module.scss'

interface NumberBarProps {
  sections: string[]
}

const NumberBar: React.FC<NumberBarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0])

  const top = useMemo(
    () => `${22 + sections.indexOf(activeSection) * 20}px`,
    [activeSection, sections]
  )

  return (
    <div className={style.wrapper}>
      <div className={style.bar}>
        <span className={style.num} style={{ top }}>
          {activeSection}
        </span>
        <Scrollspy
          items={sections}
          onUpdate={sec => setActiveSection(sec.id)}
          currentClassName="is-current"
        >
          {sections.map((sec, i) => (
            <a key={sec + i} href={`#${sec}`}>
              <div
                className={classNames(style.line, { [style.openLine]: sec === activeSection })}
              />
            </a>
          ))}
        </Scrollspy>
      </div>
    </div>
  )
}

export default NumberBar
