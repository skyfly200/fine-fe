import dynamic from 'next/dynamic'
import { Artwork, SanitySlug } from '../../types'
import Link from '../Link'
import RotatedText from '../RotatedText'
import RoundedButton from '../RoundedButton'

import s from './style.module.scss'
import sc from '../../styles/components.module.scss'
import AnimatedLetters from '../AnimatedLetters'
import { motion } from 'framer-motion'
import { fadeIn, opacity } from '../../styles/motionAnimations'

interface HeroProps {
  title: string
  slug: SanitySlug
  name: string
  items: Artwork[]
}

const DynamicPixelHero = dynamic(() => import('../PixelHero'))

const Hero: React.FC<HeroProps> = ({ title, slug, name, items }) => {
  return (
    <section className={s.heroWrapper}>
      <div className={s.content}>
        <div className={s.main}>
          <motion.div
            variants={opacity}
            initial="initial"
            animate="animate"
            className={s.rotatedWrapper}
          >
            <RotatedText>
              <h3 className={sc.h3}>NEW PROJECT</h3>
            </RotatedText>
          </motion.div>
          <AnimatedLetters letterClassName={s.projectName} title={title} />
        </div>
        <div className={s.bottom}>
          <motion.div variants={opacity} initial="initial" animate="animate">
            <Link href={`/collection/${slug.current}`} scroll>
              <RoundedButton size="xl">GO</RoundedButton>
            </Link>
          </motion.div>
          <AnimatedLetters letterClassName={sc.h3} title={`By ${name}`} />
        </div>
      </div>
      <DynamicPixelHero items={items} />
    </section>
  )
}

export default Hero
