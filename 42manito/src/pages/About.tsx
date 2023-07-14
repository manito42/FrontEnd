/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// About.tsx
import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import TypeIt from "typeit-react";
import AnimatedText from "@/components/typo/AnimationTypo";

const About = () => {
  const opserverRef = useRef<IntersectionObserver | null>(null);

  const setScrollVar = () => {
    const htmlElement = document.documentElement;
    const percentOfScreenHeightScrolled =
      htmlElement.scrollTop / htmlElement.clientHeight;
    console.log(Math.min(percentOfScreenHeightScrolled * 100, 100));
    htmlElement.style.setProperty(
      "--scroll",
      String(Math.min(percentOfScreenHeightScrolled * 100, 100))
    );
  };

  return (
    <Layout>
      {/* Other elements */}
      <div className="about-typo">
        {/* Other elements */}
        <TypeIt
          autoStart={false}
          startDelay={0}
          loop={false}
          getAfterInit={(instance) => {
            instance
              .type("Hello")
              .pause(500)
              .delete(5)
              .type("World")
              .pause(500)
              .go();

            return instance;
          }}
        />
      </div>
      {/* Other elements */}
    </Layout>
  );
};

export default About;

// const About = () => {
//   const observer = useRef<IntersectionObserver | null>(null);
//   const [isSectionVisible, setIsSectionVisible] = useState<{
//     [key: string]: boolean;
//   }>({ Typo1: false });

//   useEffect(() => {
//     const setScrollVar = () => {
//       const htmlElement = document.documentElement;
//       const sections = document.querySelectorAll(".about-section > div");
//       const scrollY = htmlElement.scrollTop;

//       let currentSection = {} as HTMLElement;

//       sections.forEach((section: Element) => {
//         const sectionHTMLElement = section as HTMLElement;
//         const sectionTop = sectionHTMLElement.offsetTop;
//         const sectionHeight = sectionHTMLElement.clientHeight;

//         if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
//           currentSection = sectionHTMLElement as HTMLElement;
//         }
//       });

//       if (currentSection) {
//         const sectionHeight = currentSection.clientHeight;
//         const sectionTop = currentSection.offsetTop;
//         const scrollInSection = scrollY - sectionTop;
//         const percentOfSectionHeightScrolled =
//           (scrollInSection / sectionHeight) * 100;

//         console.log(Math.min(percentOfSectionHeightScrolled, 100));
//         htmlElement.style.setProperty(
//           "--scroll",
//           String(Math.min(percentOfSectionHeightScrolled, 100))
//         );
//       }
//     };

//     const handleIntersection = (entries: IntersectionObserverEntry[]) => {
//       for (let i = entries.length - 1; i >= 0; i--) {
//         const entry = entries[i];
//         const isVisible = entry.isIntersecting;
//         setIsSectionVisible((prevState) => {
//           console.log("Observed entries:", entries);
//           console.log("Updated isSectionVisible state:", {
//             ...prevState,
//             [entry.target.id]: isVisible,
//           });

//           return {
//             ...prevState,
//             [entry.target.id]: isVisible,
//           };
//         });
//         if (entry.isIntersecting) {
//           document.querySelectorAll("#image-box").forEach((img) => {
//             img.classList.remove("show");
//           });

//           const targetHTMLElement = entry.target as HTMLElement;
//           const img = document.querySelector<HTMLImageElement>(
//             targetHTMLElement.dataset.imgToShow!
//           );
//           img?.classList.add("show");
//           break;
//         }
//       }
//     };

//     const newObserver = new IntersectionObserver(handleIntersection, {
//       threshold: 0.5,
//     });
//     observer.current = newObserver;

//     window.addEventListener("scroll", setScrollVar);
//     window.addEventListener("resize", setScrollVar);

//     setScrollVar();

//     document.querySelectorAll("[data-img-to-show]").forEach((section) => {
//       observer.current?.observe(section);
//     });

//     return () => {
//       window.removeEventListener("scroll", setScrollVar);
//       window.removeEventListener("resize", setScrollVar);
//       observer.current?.disconnect();
//     };
//   }, [setIsSectionVisible]);

//   return (
//     <Layout>
//       <div>
//         <section className="about-section">
//           <div>
//             <div
//               id="image-box"
//               className="about-image1"
//               data-img-to-show="#Test1"
//             >
//               <span id="Typo-text1" className="about-typo-text-title">
//                 42Manito
//               </span>
//               <span id="Typo-text2" className="about-typo-text-big">
//                 No man lives alone.
//               </span>
//             </div>
//           </div>
//           <div id="Typo1" className="about-typo">
//             <img
//               src="pexels-ricardo-oliveira-13952574.jpg"
//               alt="arrow"
//               className="arrow"
//             />
//             <AnimatedText
//               text={"manito"}
//               isVisible={isSectionVisible.Typo1}
//               fontSize={120}
//               textColor="blue"
//               speed={50}
//               delay={500}
//             />
//           </div>
//           <div
//             id="Test1"
//             className=" delay-[300ms] duration-[600ms] translate-y-[200px]  text-stone-200"
//           >
//             <span className="text-white text-[5em]">안녕하세요</span>
//           </div>

//           <div
//             id="image-box"
//             className="about-image2"
//             data-img-to-show="#Typo2"
//           >
//             <span id="Typo-text3" className="about-typo-text-title">
//               42Manito
//             </span>
//             <span id="Typo-text4" className="about-typo-text-big">
//               No man lives alone.
//             </span>
//           </div>
//           <div className="w-full h-100vh">
//             <div id="Typo2" className="about-typo">
//               <img
//                 src="pexels-ricardo-oliveira-13952574.jpg"
//                 alt="arrow"
//                 className="arrow"
//               />
//               {/* Typo 자리*/}
//             </div>
//           </div>
//           <div id="image-box" className="about-image3">
//             <span id="Typo-text5" className="about-typo-text-title">
//               42Manito
//             </span>
//             <span id="Typo-text6" className="about-typo-text-big">
//               No man lives alone.
//             </span>
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// };

// export default About;
