/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

interface TypoActionProps {
  text: string;
  pointText?: string;
  className?: string;
  pointColor?: string;
  cursorText?: string;
  cursorView?: boolean;
  cursorColor?: string;
  delay?: number;
  speed?: number;
}

const TypoActionTest: React.FC<TypoActionProps> = ({
  text,
  pointText = "",
  className,
  pointColor = "red",
  cursorText = "|",
  cursorView = true,
  cursorColor = "white",
  delay = 0,
  speed = 100,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [animationPlayed, setAnimationPlayed] = useState<boolean>(false);
  const [cursorOpacity, setCursorOpacity] = useState<number>(1);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const applyPointText = (inputText: string) => {
    if (pointText) {
      const targetIndex = inputText.indexOf(pointText);
      if (targetIndex !== -1) {
        return (
          <>
            {inputText.slice(0, targetIndex)}
            <span style={{ color: pointColor }}>{pointText}</span>
            {inputText.slice(targetIndex + pointText.length)}
          </>
        );
      }
    }
    return inputText;
  };

  const handleScroll = (callback: () => void) => {
    if (playing) return;

    if (!animationPlayed && displayedText.length < text.length) {
      let index = 0;

      if (intervalId !== null) {
        clearInterval(intervalId);
      }

      const startAnimation = () => {
        const interval = setInterval(() => {
          if (index < text.length) {
            setDisplayedText((displayText) => text.slice(0, ++index));
          } else {
            clearInterval(interval);
            setIntervalId(null);
            callback();
          }
        }, speed);
        setIntervalId(interval);
      };

      if (delay !== 0) {
        setTimeout(startAnimation, delay);
      } else {
        startAnimation();
      }

      setAnimationPlayed(true);
      setPlaying(true);
    }
  };

  const reversedAnimation = (callback: () => void) => {
    if (playing) return;

    let reversedIndex = text.length;

    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    const reversedInterval = setInterval(() => {
      if (reversedIndex > -1) {
        setDisplayedText((displayText) => {
          if (displayText.length > 0) {
            return text.slice(0, reversedIndex);
          }
          return displayText;
        });
        reversedIndex--;
      } else {
        clearInterval(reversedInterval);
        setIntervalId(null);
        callback();
      }
    }, speed);
    setIntervalId(reversedInterval);

    setPlaying(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      {
        threshold: 1,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [textRef]);

  useEffect(() => {
    if (isVisible) {
      if (!animationPlayed && displayedText.length < text.length) {
        handleScroll(() => {
          setPlaying(false);
          setAnimationPlayed(true); // 상태 추가
        });
      }
    } else {
      if (animationPlayed && displayedText.length === text.length) {
        reversedAnimation(() => {
          setPlaying(false);
          setAnimationPlayed(false); // 상태 추가
        });
      }
    }
  }, [isVisible]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorOpacity((state) => (state === 0 ? 1 : 0));
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <span className={className} ref={textRef}>
      {applyPointText(displayedText)}
      {cursorView && (
        <span
          style={{
            opacity: cursorOpacity,
            paddingLeft: "3px",
            color: cursorColor,
          }}
        >
          {cursorText}
        </span>
      )}
    </span>
  );
};
const MemoizedTypoActionTest = React.memo(TypoActionTest);

export default MemoizedTypoActionTest;
