import React, { useEffect, useState } from "react";
import TypeIt from "typeit-react";

const Typo = () => {
  const mainTypo: string = "내 열정과 경험을 공유하고, 멘토와 함께 성장하세요!";
  const TypoPoint1: string = "열정";
  const TypoPoint2: string = "경험";
  const TypoPoint3: string = "공유";
  const TypoPoint4: string = "멘토";
  const TypoPoint5: string = "성장";
  const TypoPoint6: string = "함께";
  const TypoPoint7: string = "신청";
  const firstTypo: string = "내 열정과 경험을 공유하고, ";
  const Typo2: string = "멘토와 함께 성장하세요!";
  const Typo3: string = "지금 바로 멘토 신청하세요!";

  return (
    <div className=" flex flex-col min-h-[80vh] p-5 items-start justify-center text-4xl sm:text-5xl lg:text-7xl font-bold md:mx-0">
      <div className="mt-16">
        <TypeIt
          options={{
            loop: false,
            speed: 50,
            waitUntilVisible: true,
            cursor: false,
          }}
        >
          <span className="text-4xl sm:text-5xl lg:text-7xl text-neutral-800 dark:text-neutral-200">
            {"내 "}
          </span>
          <span className="text-4xl sm:text-6xl lg:text-8xl text-pink-600">
            {TypoPoint1}
          </span>
          <span className="text-4xl sm:text-5xl lg:text-7xl text-neutral-800 dark:text-neutral-200">
            {"과 "}
          </span>
          <span className="text-4xl sm:text-6xl lg:text-8xl text-pink-600">
            {TypoPoint2}
          </span>
          <span className="text-4xl sm:text-5xl lg:text-7xl text-neutral-800 dark:text-neutral-200">
            {"을 "}
          </span>
          <span className="text-4xl sm:text-6xl lg:text-8xl text-pink-600">
            {TypoPoint3}
          </span>
          <span className="text-4xl sm:text-5xl lg:text-7xl text-neutral-800 dark:text-neutral-200">
            {"하고, "}
          </span>
        </TypeIt>
      </div>
      <div className="mt-7">
        <TypeIt
          options={{
            loop: false,
            speed: 50,
            waitUntilVisible: true,
            cursor: false,
            startDelay: firstTypo.length * 60,
          }}
        >
          <span className="text-4xl sm:text-6xl lg:text-8xl text-pink-600">
            {TypoPoint4}
          </span>
          <span className="text-4xl sm:text-5xl lg:text-7xl text-neutral-800 dark:text-neutral-200">
            {"와 "}
          </span>
          <span className="text-4xl sm:text-6xl lg:text-8xl text-pink-600">
            {TypoPoint5}
          </span>
          <span className="text-4xl sm:text-5xl lg:text-7xl text-neutral-800 dark:text-neutral-200">
            {"하세요!"}
          </span>
        </TypeIt>
      </div>

      <div className="my-16">
        <TypeIt
          as="span"
          options={{
            loop: false,
            speed: 70,
            waitUntilVisible: true,
            startDelay: mainTypo.length * 60,
            cursor: true,
          }}
        >
          <span className="text-2xl sm:text-3xl lg:text-5xl text-neutral-800 dark:text-neutral-200">
            {"지금 바로 멘토링 "}
          </span>
          <span className="text-3xl sm:text-4xl lg:text-6xl text-indigo-600">
            {"신청"}
          </span>
          <span className="text-2xl sm:text-3xl lg:text-5xl text-neutral-800 dark:text-neutral-200 mr-10">
            {"하세요!"}
          </span>
        </TypeIt>
      </div>
    </div>
  );
};

export default Typo;
