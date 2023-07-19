/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// About.tsx
import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import TypeIt from "typeit-react";
import AnimatedText from "@/components/typo/AnimationTypo";
import TypoAction from "typo-action";
import TypoActionTest from "@/components/about/typoAction";

const About = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  const setScrollVar = () => {
    const htmlElement = document.documentElement;
    const sections = document.querySelectorAll(".about");
    const scrollY = htmlElement.scrollTop;

    let currentSection = {} as HTMLElement;

    sections.forEach((section: Element) => {
      const sectionHTMLElement = section as HTMLElement;
      const sectionTop = sectionHTMLElement.offsetTop;
      const sectionHeight = sectionHTMLElement.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = sectionHTMLElement as HTMLElement;
      }
    });

    if (currentSection) {
      const sectionHeight = currentSection.clientHeight;
      const sectionTop = currentSection.offsetTop;
      const scrollInSection = scrollY - sectionTop;
      const percentOfSectionHeightScrolled =
        (scrollInSection / sectionHeight) * 100;

      console.log(Math.min(percentOfSectionHeightScrolled, 100));
      htmlElement.style.setProperty(
        "--scroll",
        String(Math.min(percentOfSectionHeightScrolled, 100))
      );
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    for (let entry of entries) {
      const section = entry.target as HTMLElement;
      const targetId = section.id;
      const targetShowElement = document.querySelector(
        `.about-show[data-id='${targetId}']`
      );

      if (!targetShowElement) continue;

      if (entry.isIntersecting) {
        // Add animations for each section
        if (targetId === "about2") {
          const targetTitle = document.querySelector(`#about2 .about-title`);
          targetTitle?.classList.remove("fade-out-right");
          targetTitle?.classList.add("fade-in-right");
        } else if (targetId === "about3") {
          const targetTitle = document.querySelector(`#about3 .about-title`);
          targetTitle?.classList.remove("fade-out-left");
          targetTitle?.classList.add("fade-in-left");
          const targetImage = document.querySelector(`#about3 .about-image`);
          targetImage?.classList.remove("image-fade-out-left");
          targetImage?.classList.add("image-fade-in-left");
        } else if (targetId === "about4") {
          const targetTitle = document.querySelector(`#about4 .about-title`);
          targetTitle?.classList.remove("fade-out-right");
          targetTitle?.classList.add("fade-in-right");
          const targetImage = document.querySelector(`#about4 .about-image`);
          targetImage?.classList.remove("image-fade-out-right");
          targetImage?.classList.add("image-fade-in-right");
        } else if (targetId === "about5") {
          const targetTitle = document.querySelector(`#about5 .about-title`);
          targetTitle?.classList.remove("fade-out-left");
          targetTitle?.classList.add("fade-in-left");
        }
      } else {
        // Reverse animations for each section
        if (targetId === "about2") {
          const targetTitle = document.querySelector(`#about2 .about-title`);
          targetTitle?.classList.remove("fade-in-right");
          targetTitle?.classList.add("fade-out-right");
        } else if (targetId === "about3") {
          const targetTitle = document.querySelector(`#about3 .about-title`);
          targetTitle?.classList.remove("fade-in-left");
          targetTitle?.classList.add("fade-out-left");
          const targetImage = document.querySelector(`#about3 .about-image`);
          targetImage?.classList.remove("image-fade-in-left");
          targetImage?.classList.add("image-fade-out-left");
        } else if (targetId === "about4") {
          const targetTitle = document.querySelector(`#about4 .about-title`);
          targetTitle?.classList.remove("fade-in-right");
          targetTitle?.classList.add("fade-out-right");
          const targetImage = document.querySelector(`#about4 .about-image`);
          targetImage?.classList.remove("image-fade-in-right");
          targetImage?.classList.add("image-fade-out-right");
        } else if (targetId === "about5") {
          const targetTitle = document.querySelector(`#about5 .about-title`);
          targetTitle?.classList.remove("fade-in-left");
          targetTitle?.classList.add("fade-out-left");
        }
      }
    }
  };

  useEffect(() => {
    const aboutObserver = new IntersectionObserver(handleIntersection, {
      rootMargin: "-150px 0px -150px 0px",
    });

    setScrollVar();

    observer.current = aboutObserver;

    document.querySelectorAll(".about").forEach((section) => {
      observer.current?.observe(section);
    });

    window.addEventListener("scroll", setScrollVar);
    window.addEventListener("resize", setScrollVar);

    return () => {};
  }, []);

  return (
    <Layout>
      {/* Other elements */}
      <div className="about" id="about1">
        <div className="about-show" data-id="about1">
          <div className="about1-content">
            <div className="about-left text-white">
              <TypoAction
                text="No man lives alone."
                className="typo-action1"
                cursorView={false}
                speed={80}
              />
            </div>
            <div className="about-right">
              <TypoAction
                text="42Manito"
                className="typo-action2"
                speed={80}
                delay={80 * 3}
                cursorColor="blue"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="about" id="about2">
        <div className="absolute w-[100vw] h-[100vh] opacity-70 bg-gray-700" />
        <div className="about-show" data-id="about2">
          <span className="about-title">
            {`"42마니또에서 나도 가르치는 베테랑, 배우는 초심자가 될 수 있다!
            42서울의 각양각색 멘토링 경험을 만끽해보세요."`}
          </span>
        </div>
      </div>
      <div className="about" id="about3">
        <div className="absolute w-[100vw] h-[100vh] opacity-40 bg-black" />
        <div className="about-show" data-id="about3">
          <span className="about-title">{`"42마니또 통해 서로 지식과 취미를 나누며 성장하는 42서울의 정체성을 경험해보세요. 서로의 시너지를 느낄 수 있는 환경에서 더 큰 발전을 이루어 가요."`}</span>
          <img src="pexels-fauxels-3183165.jpg" className="about-image" />
        </div>
      </div>
      <div className="about" id="about4">
        <div className="absolute w-[100vw] h-[100vh] opacity-40 bg-black" />
        <div className="about-show" data-id="about4">
          <img
            src="pexels-ricardo-oliveira-13952574.jpg"
            className="about-image"
          />
          <span className="about-title">
            {`"멘토 신청으로 지식과 열정을 나누세요. 누구나 멘토가 될 수 있습니다!"`}
          </span>
        </div>
      </div>
      <div className="about" id="about5">
        <div className="about-show" data-id="about5">
          <span className="about-title">{`"42마니또와 함께 공부와 취미를 도전하며 도움과 격려를 받아보세요!"`}</span>
        </div>
      </div>
    </Layout>
  );
};

export default About;
