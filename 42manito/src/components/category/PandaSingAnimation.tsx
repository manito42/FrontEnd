import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/panda-sing.json";

const PandaSingAnimation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: "35vh", height: "35vh" }}
    />
  );
};

export default PandaSingAnimation;
