import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import EventCard, { EventCardProps } from '../EventCard'
import style from './style.module.scss'
import DotButton from './DotButton'

interface EventCarouselProps {
  events: EventCardProps[]
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
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

  return (
    <>
      <div ref={emblaRef} className={style.embla}>
        <div className={style.emblaContainer}>
          {events.map((e, i) => (
            <div key={e.title + i} className={style.emblaSlide}>
              <EventCard {...e} />
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

export default EventCarousel
