import React from "react";
import Image from "next/image";
import about3 from "public/about3Image.webp";

export default function About3() {
  return (
    <div className="about" id="about3">
      <div className="absolute w-[100vw] h-[100vh] opacity-40 bg-black" />
      <div className="about-show" data-id="about3">
        <span className="about-title">{`"마니또를 통해 서로 지식과 취미를 나누며 성장하는 42서울의 정체성을 경험해보세요. 서로의 시너지를 느낄 수 있는 환경에서 더 큰 발전을 이루어 가요."`}</span>
        <Image src={about3} className="about-image" alt="about3Image" />
      </div>
    </div>
  );
}
