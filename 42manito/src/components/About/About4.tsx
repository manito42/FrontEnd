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
          {`"마니또와 함께 성장하다! 42서울 커뮤니티에서 당신의 동료를 찾으세요."`}
        </span>
      </div>
    </div>
  );
}
