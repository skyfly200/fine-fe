import cn from 'classnames'
import Link from '../Link'
import s from './style.module.scss'

type FixedSidenavProps = {
  menu: string[]
  active: string
}

const FixedSidenav: React.FC<FixedSidenavProps> = ({ menu, active }) => {
  return (
    <div className={s.sidenav}>
      <ul className={s.nav}>
        {menu.map(item => (
          <li key={item}>
            <Link
              href={`#${item}`}
              className={cn(s.link, { [s.active]: active.toLowerCase() === item.toLowerCase() })}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FixedSidenav
