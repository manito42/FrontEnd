import React from "react";
import Lottie from "react-lottie-player";

export interface CustomSizeKeys {
  small: string;
  medium: string;
  large: string;
}

interface Props {
  size: keyof CustomSizeKeys;
  animationData: object;
}

const customSize: CustomSizeKeys = {
  small: "25vh",
  medium: "35vh",
  large: "45vh",
};

export default function ManitoLottieAnimation({ size, animationData }: Props) {
  const width = customSize[size];
  const height = customSize[size];

  return (
    <Lottie
      loop
      animationData={animationData}
      play
      style={{ width: width, height: height }}
    />
  );
}
