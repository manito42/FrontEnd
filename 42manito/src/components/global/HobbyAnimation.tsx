import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/hobby.json";

const HobbyAnimation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: "35vh", height: "35vh" }}
    />
  );
};

export default HobbyAnimation;
