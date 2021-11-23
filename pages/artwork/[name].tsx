import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import { sceneSetup, useWindowSize } from "../../utils";

import style from "../../styles/pages/artwork.module.scss";

const pieceConfig = {
  height: 400,
  width: 280,
};

const ArtworkPage: NextPage = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const { height, width } = useWindowSize();
  useEffect(() => {
    sceneSetup(canvasContainer);
  }, []);

  return (
    <Layout hideLogo>
      <div className={style.artwork}>
        <div className={style.gallery}>
          <div
            ref={canvasContainer}
            className={style.canvasWrapper}
            style={{
              height: pieceConfig.height,
              width: pieceConfig.width,
              top: (height - pieceConfig.height) / 2,
              left: (width - pieceConfig.width) / 2,
              marginBottom: (height - pieceConfig.height) / 2,
            }}
          />
          <div style={{ height: `${(height - pieceConfig.height) / 2}px` }} />
          <div className={style.details}></div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtworkPage;
