import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { BannerDto } from "@/Types/Banners/Banner.dto";

interface props {
  banner: BannerDto[];
}

// 추후 여러 배너를 받을 수 있는 형태로 수정이 필요함.
export default function TopBanner({ banner }: props) {
  const bannerLength = banner.length;
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleBannerClick = () => {
    if (banner[currentIndex].link && banner[currentIndex].link[0] === "/") {
      router.push(banner[currentIndex].link);
    } else {
      window.open(banner[currentIndex].link, "_blank");
    }
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

  const sideButtonHandler = (type: string) => {
    clearTimeout(bannerTimerId);
    if (type === "left") {
      currentIndex === 0
        ? setCurrentIndex(banner.length - 1)
        : setCurrentIndex(currentIndex - 1);
    } else {
      currentIndex === banner.length - 1
        ? setCurrentIndex(0)
        : setCurrentIndex(currentIndex + 1);
    }
  };

  const bannerCircle = banner.map((banner, index) => {
    return (
      <div
        key={index}
        className={`banner-circle ${
          index === currentIndex ? "bg-white" : "bg-gray-300"
        }`}
        onClick={() => handleBannerCircleClick(index)}
      ></div>
    );
  });

  return (
    <>
      <div
        className={`top-banner-wrapper ${banner[currentIndex].backgroundColor} ${banner[currentIndex].textColor}`}
      >
        {bannerLength !== 1 && (
          <div className="left-arrow-wrapper">
            <button
              className="left-arrow-button"
              onClick={() => sideButtonHandler("left")}
            >
              <CaretLeftOutlined className="left-arrow"></CaretLeftOutlined>
            </button>
          </div>
        )}
        <div className="top-banner-container" onClick={handleBannerClick}>
          <div className="top-banner-right">
            {banner[currentIndex].image !== undefined && (
              <Image
                src={banner[currentIndex].image as string}
                alt={
                  banner[currentIndex].license
                    ? (banner[currentIndex].license as string)
                    : ""
                }
                width={200}
                height={200}
                priority={true}
              />
            )}
          </div>
          <div className="top-banner-left">
            <div className="top-banner-head">{banner[currentIndex].head}</div>
            <div className="top-banner-title">{banner[currentIndex].title}</div>
            <div className="top-banner-description">
              {banner[currentIndex].description}
            </div>
          </div>
        </div>
        {bannerLength !== 1 && (
          <div className="banner-circles-wrapper">
            <div className="banner-circles-container ">{bannerCircle}</div>
          </div>
        )}
        {bannerLength !== 1 && (
          <div className="right-arrow-wrapper">
            <button
              className="right-arrow-button"
              onClick={() => sideButtonHandler("right")}
            >
              <CaretRightOutlined className="right-arrow"></CaretRightOutlined>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
