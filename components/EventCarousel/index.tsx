import useEmblaCarousel from "embla-carousel-react";
import EventCard, { EventCardProps } from "../EventCard";
import style from "./style.module.scss";

interface EventCarouselProps {
  events: EventCardProps[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  const [emblaRef] = useEmblaCarousel({ skipSnaps: true });

  return (
    <div ref={emblaRef} className={style.embla}>
      <div className={style.emblaContainer}>
        {events.map((e, i) => (
          <div key={e.title + i} className={style.emblaSlide}>
            <EventCard {...e} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
