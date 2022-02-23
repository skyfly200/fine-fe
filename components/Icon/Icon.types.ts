export type Icons =
  | 'arrow-right'
  | 'arrow-left'
  | 'f-logo'
  | 'eth'
  | 'ine-logo'
  | 'instagram'
  | 'twitter'
  | 'discord'
  | 'gallery'
  | 'canvas'
  | 'details'
  | 'about'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'search'
  | 'full-screen'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'sm-F' | 'sm-INE' | 'F' | 'INE'

export type IconProps = {
  className?: string
  icon: Icons
  size?: IconSize
}
