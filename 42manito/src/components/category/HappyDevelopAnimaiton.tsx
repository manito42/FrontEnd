import React, { useMemo } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/happy-developer-red.json";

const HappyDevelopAnimation = () => {
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

export default HappyDevelopAnimation;
