import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout/Layout";
import About1 from "@/components/About/About1";
import About2 from "@/components/About/About2";
import About3 from "@/components/About/About3";
import About4 from "@/components/About/About4";
import About5 from "@/components/About/About5";

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
      <About1 />
      <About2 />
      <About3 />
      <About4 />
      <About5 />
    </Layout>
  );
};

export default About;
