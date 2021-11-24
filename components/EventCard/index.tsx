import Image from "next/image";
import style from "./style.module.scss";

export interface EventCardProps {
  title: string;
  img: string;
  alt?: string;
  date?: Date | string;
}

const EventCard: React.FC<EventCardProps> = ({ title, img, alt, date }) => {
  console.log(img);
  return (
    <div className={style.eventCard}>
      <div className={style.imgWrapper}>
        <div className={style.img} style={{ backgroundImage: `url(${img})` }} />
      </div>
      <h5 className={style.date}>event date: {date}</h5>
      <h3 className={style.title}>{title}</h3>
    </div>
  );
};

export default EventCard;
