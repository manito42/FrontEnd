import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BannerDto } from "@/Types/Banners/Banner.dto";
import { clear } from "console";

interface props {
  banner: BannerDto[];
}

// 추후 여러 배너를 받을 수 있는 형태로 수정이 필요함.
export default function TopBanner({ banner }: props) {
  const router = useRouter();
  const BannerData = banner;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleBannerClick = () => {
    router.push(BannerData[currentIndex].link);
  };
  var timerId: any;
  const timer = 5000; // 임의로 넣어뒀습니다

  const autoPlay = () => {
    timerId = setTimeout(() => {
      console.log(currentIndex);
      if (currentIndex === BannerData.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, timer);
  };

  useEffect(autoPlay, [currentIndex]);

  const handleBannerCircleClick = (index: number) => {
    clearTimeout(timerId);
    setCurrentIndex(index);
  };

  return (
    <>
      <div
        className={`top-banner-wrapper ${BannerData[currentIndex].backgroundColor} ${BannerData[currentIndex].textColor}`}
      >
        <div className="top-banner-container">
          <div className="top-banner-right" onClick={handleBannerClick}>
            <Image
              src={BannerData[currentIndex].image}
              alt={
                BannerData[currentIndex].license
                  ? BannerData[currentIndex].license
                  : ""
              }
              width={200}
              height={200}
              priority={true}
            />
          </div>
          <div className="top-banner-left" onClick={handleBannerClick}>
            <div className="top-banner-head">
              {BannerData[currentIndex].head}
            </div>
            <div className="top-banner-title">
              {BannerData[currentIndex].title}
            </div>
            <div className="top-banner-description">
              {BannerData[currentIndex].description}
            </div>
          </div>
        </div>
        <div className="banner-circles-wrapper">
          <div className="banner-circles-container ">
            {BannerData.map((banner, index) => {
              return (
                <div
                  className={`banner-circle ${
                    index === currentIndex ? "bg-white" : "bg-gray-300"
                  }`}
                  onClick={() => handleBannerCircleClick(index)}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
