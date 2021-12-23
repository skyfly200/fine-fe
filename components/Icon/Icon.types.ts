export type Icons =
  | 'arrow-right'
  | 'arrow-left'
  | 'f-logo'
  | 'eth'
  | 'ine-logo'
  | 'instagram'
  | 'twitter'
  | 'discord'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'sm-F' | 'sm-INE' | 'F'

export type IconProps = {
  className?: string
  icon: Icons
  size?: IconSize
}
