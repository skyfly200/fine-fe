import { useEffect, useRef } from 'react';
import style from './style.module.scss';
import { drawFine } from '../../utils';

const SoonCanvas = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      drawFine(canvasContainer);
    }
  }, []);

  return <div ref={canvasContainer} className={style.canvasContainer} />;
};

export default SoonCanvas;
