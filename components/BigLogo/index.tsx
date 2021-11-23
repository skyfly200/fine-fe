import Link from "next/link";
import Image from "next/image";

import classNames from "classnames";

import style from "./style.module.scss";
import LogoCanvas from "./LogoCanvas";

export interface BigLogoProps {
  showCanvas?: boolean;
}

const BigLogo: React.FC<BigLogoProps> = ({ showCanvas }) => (
  <div>
    {showCanvas && <LogoCanvas />}
    <Link href="/" passHref>
      <a className={style.logo}>
        <img
          className={classNames(style.letter, style.f)}
          src="/logo/f.svg"
          alt="logo-f"
        />
        <img
          className={classNames(style.letter, style.ine)}
          src="/logo/ine.svg"
          alt="logo-ine"
        />
      </a>
    </Link>
  </div>
);

export default BigLogo;
