import Image from "next/image";

import style from "./style.module.scss";

interface NewsCardProps {
  title: string;
  img: string | StaticImageData;
  alt?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, img, alt }) => {
  return (
    <div className={style.newsCard}>
      <div className={style.imgWrapper}>
        <Image
          src={img}
          alt={alt}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
      </div>

      <h3 className={style.title}>{title}</h3>
    </div>
  );
};

export default NewsCard;
