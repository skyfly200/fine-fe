import { useEffect, useRef } from 'react';
import style from './style.module.scss';
import { sceneSetup } from '../../utils';

const SoonCanvas = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sceneSetup(canvasContainer);
    }
  }, []);

  return <div ref={canvasContainer} className={style.canvasContainer} />;
};

export default SoonCanvas;
