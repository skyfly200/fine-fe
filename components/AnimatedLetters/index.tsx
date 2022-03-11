import { motion } from 'framer-motion'
import { banner, fadeIn, opacity } from '../../styles/motionAnimations'

interface AnimatedLettersProps {
  title: string
  rowClassName?: string
  letterClassName: string
  disabled?: boolean
}

const AnimatedLetters: React.FC<AnimatedLettersProps> = ({
  title,
  rowClassName,
  letterClassName,
  disabled
}) => (
  <motion.span className={rowClassName} variants={banner} initial="initial" animate="animate">
    {title.split('').map(letter => (
      <motion.span key={`animated-letter-${letter}`} variants={opacity} className={letterClassName}>
        {letter}
      </motion.span>
    ))}
  </motion.span>
)
export default AnimatedLetters
