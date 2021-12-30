import { ReactNode, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import style from './style.module.scss'
import DotButton from './DotButton'

interface CarouselProps {
  items: ReactNode[]
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [emblaRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const scrollTo = useCallback(
    index => {
      embla && embla.scrollTo(index)
    },
    [embla]
  )
  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])
  console.log(items)
  return (
    <>
      <div ref={emblaRef} className={style.embla}>
        <div className={style.emblaContainer}>
          {items.map((e, i) => (
            <div key={`slide-${i}`} className={style.emblaSlide}>
              {e}
            </div>
          ))}
        </div>
      </div>
      <div className={style.dotsWrapper}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  )
}

export default Carousel
