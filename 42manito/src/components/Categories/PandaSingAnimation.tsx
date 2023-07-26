import React, { useMemo } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/panda-sing.json";

const PandaSingAnimation = () => {
  const width = useMemo(() => "35vh", []);
  const height = useMemo(() => "35vh", []);

  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: width, height: height }}
    />
  );
};

export default PandaSingAnimation;
