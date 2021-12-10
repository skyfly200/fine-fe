import cn from 'classnames'
import React from 'react'
import { IconProps } from './Icon.types'

import styles from './style.module.scss'

const Icon = ({ className, icon, size = 'sm' }: IconProps) => (
  <i className={cn(styles.icon, styles[size], styles[icon], className)} />
)

export default Icon
