/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import useAnimationTypo from "./useAnimationTypo";

interface AnimatedTextProps {
  fontSize?: number;
  textColor?: string;
  speed?: number;
  delay?: number;
  text: string;
  isVisible: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  fontSize,
  textColor,
  speed,
  delay,
  text,
  isVisible,
}) => {
  const animatedText = useAnimationTypo(text, isVisible, {
    speed,
    delay,
    isVisible,
  });

  console.log(isVisible);

  return (
    <div
      className="animated-text text-blue-300 w-full text-center relative"
      style={{ fontSize, color: "white" }}
    >
      {animatedText}
    </div>
  );
};

export default AnimatedText;
