import Image from "next/image";
import React from "react";

export default function About2() {
  return (
    <div className="about" id="about2">
      <div className="absolute w-[100vw] h-[100vh] opacity-70 bg-neutral-700" />
      <div className="about-show" data-id="about2">
        <span className="about-title">
          {`"마니또에서 나도 가르치는 베테랑, 배우는 초심자가 될 수 있다!
            각양각색 멘토링 경험을 만끽해보세요."`}
        </span>
      </div>
    </div>
  );
}
