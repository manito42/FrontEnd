import { useEffect, useState } from "react";

interface AnimatedTextOptions {
  speed?: number;
  isVisible: boolean;
  delay?: number;
}

const useAnimationTypo = (
  text: string,
  isVisible: boolean,
  options?: AnimatedTextOptions
) => {
  const speed = options?.speed || 100;
  const delay = options?.delay || 0;
  const [animatedText, setAnimatedText] = useState("");
  const reverse = isVisible === false ? true : false;
  console.log(options);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const forwardAnimateText = () => {
      let index = 0;
      const animate = () => {
        if (index < text.length) {
          setAnimatedText((prev) => prev + text[index]);
          index += 1;
          timer = setTimeout(animate, speed);
        }
      };
      setTimeout(() => animate(), delay);
    };

    const reverseAnimateText = () => {
      let index = text.length - 1;
      const animate = () => {
        if (index >= 0) {
          setAnimatedText((prev) => prev.slice(0, -1));
          index -= 1;
          timer = setTimeout(animate, speed);
        }
      };
      setTimeout(() => animate(), delay);
    };

    if (isVisible) {
      if (reverse) {
        reverseAnimateText();
      } else {
        forwardAnimateText();
      }
    } else {
      setAnimatedText("");
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, text, reverse, speed, delay]);
  return animatedText;
};

export default useAnimationTypo;
