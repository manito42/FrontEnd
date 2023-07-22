import React from "react";
import Image from "next/image";
import about4 from "public/about4Image.webp";

export default function About4() {
  return (
    <div className="about" id="about4">
      <div className="absolute w-[100vw] h-[100vh] opacity-40 bg-black" />
      <div className="about-show" data-id="about4">
        <Image
          src={about4}
          className="about-image"
          alt={"about4Image"}
          placeholder="blur"
        />
        <span className="about-title">
          {`"멘토 신청으로 지식과 열정을 나누세요. 누구나 멘토가 될 수 있습니다!"`}
        </span>
      </div>
    </div>
  );
}
