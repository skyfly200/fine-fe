import { SocialNetwork, SocialNetworks } from '../../types'
import Icon from '../Icon'
import { IconSize } from '../Icon/Icon.types'
import style from './style.module.scss'

interface SocialNetworksListProps {
  socialNetworks: SocialNetworks
  size?: IconSize
}

const SocialNetworksList: React.FC<SocialNetworksListProps> = ({ socialNetworks, size }) => {
  return (
    <div className={style.wrapper}>
      {Object.keys(socialNetworks).map(
        key =>
          socialNetworks[key as SocialNetwork].url && (
            <a key={key} href={socialNetworks[key as SocialNetwork].url}>
              <Icon icon={key as SocialNetwork} size={size} />
            </a>
          )
      )}
    </div>
  )
}

export default SocialNetworksList
