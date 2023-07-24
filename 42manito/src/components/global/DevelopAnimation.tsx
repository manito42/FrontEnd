import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/developer.json";

interface props {
  size?: string;
}

const DevelopAnimation = ({ size }: props) => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: size ? size : "35vh", height: size ? size : "35vh" }}
    />
  );
};

export default DevelopAnimation;
