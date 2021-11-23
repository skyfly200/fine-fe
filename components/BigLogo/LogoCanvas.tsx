import Link from "next/link";
import { useEffect, useRef } from "react";
import style from "./style.module.scss";
import { sceneSetup } from "../../utils";

const LogoCanvas = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sceneSetup(canvasContainer);
  }, []);

  return (
    <Link href="/artwork/test" passHref>
      <div ref={canvasContainer} className={style.canvasContainer} />
    </Link>
  );
};

export default LogoCanvas;
