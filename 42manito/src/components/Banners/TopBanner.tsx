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
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleBannerClick = () => {
    router.push(banner[currentIndex].link);
  };
  const [bannerTimerId, setBannerTimerId] = useState<NodeJS.Timeout>();
  const timer = 3000; // 임의로 넣어뒀습니다

  const autoPlay = () => {
    const timerId = setTimeout(() => {
      if (currentIndex === banner.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, timer);
    setBannerTimerId(timerId);
  };

  useEffect(() => {
    return () => {
      clearTimeout(bannerTimerId);
    };
  }, []);

  useEffect(autoPlay, [currentIndex]);

  const handleBannerCircleClick = (index: number) => {
    clearTimeout(bannerTimerId);
    setCurrentIndex(index);
  };

  return (
    <>
      <div
        className={`top-banner-wrapper ${banner[currentIndex].backgroundColor} ${banner[currentIndex].textColor}`}
      >
        <div className="top-banner-container">
          <div className="top-banner-right" onClick={handleBannerClick}>
            <Image
              src={banner[currentIndex].image}
              alt={
                banner[currentIndex].license ? banner[currentIndex].license : ""
              }
              width={200}
              height={200}
              priority={true}
            />
          </div>
          <div className="top-banner-left" onClick={handleBannerClick}>
            <div className="top-banner-head">{banner[currentIndex].head}</div>
            <div className="top-banner-title">{banner[currentIndex].title}</div>
            <div className="top-banner-description">
              {banner[currentIndex].description}
            </div>
          </div>
        </div>
        <div className="banner-circles-wrapper">
          <div className="banner-circles-container ">
            {banner.map((banner, index) => {
              return (
                <div
                  key={index}
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
