import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export interface banner {
  head: string;
  title: string; // title
  description: string; // description
  link: string; // image link
  backgroundColor: string; // backgroundColor
  textColor: string; // textColor
  image: string; // image
  license?: string; // license
}

interface props {
  banner: banner;
}

// 추후 여러 배너를 받을 수 있는 형태로 수정이 필요함.
export default function TopBanner({ banner }: props) {
  const router = useRouter();
  const {
    head,
    title,
    description,
    link,
    backgroundColor,
    textColor,
    image,
    license,
  } = banner;
  const handleBannerClick = () => {
    router.push(link);
  };
  return (
    <>
      <div className={`top-banner-wrapper ${backgroundColor} ${textColor}`}>
        <div className="top-banner-container">
          <div className="top-banner-right" onClick={handleBannerClick}>
            <Image
              src={image}
              alt={license ? license : ""}
              width={200}
              height={200}
              priority={true}
            />
          </div>
          <div className="top-banner-left" onClick={handleBannerClick}>
            <div className="top-banner-head">{head}</div>
            <div className="top-banner-title">{title}</div>
            <div className="top-banner-description">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
