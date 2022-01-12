import RotatedText from '../../../components/RotatedText'
import TextInput from '../../../components/TextInput'

import style from './style.module.scss'

interface SideSearchProps {
  title: string
}

const SideSearch: React.FC<SideSearchProps> = ({ children, title }) => {
  return (
    <div className={style.pageWrapper}>
      <div className={style.firstCol}>
        <div className={style.blank} />
        <div className={style.searchWrapper}>
          <h1 className={style.subtitle}>Featured in FINE</h1>
          <TextInput styleType="search" />
        </div>
        <RotatedText>
          <h2 className={style.pageTitle}>{title}</h2>
        </RotatedText>
      </div>
      <div className={style.childrenWrapper}>{children} </div>
    </div>
  )
}

export default SideSearch
