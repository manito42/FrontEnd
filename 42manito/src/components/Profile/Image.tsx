import React from "react";
import Image from "next/image";

interface props {
  src: string;
}

export default function ProfileImage({ src }: props) {
  return (
    <div className="ProfileImageWrapper">
      <Image
        alt="ProfileImage"
        src={src}
        width={200}
        height={200}
        quality={100}
        className="ProfileImage"
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
