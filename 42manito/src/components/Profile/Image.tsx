import React from "react";
import Image from "next/image";

interface props {
  src: string;
}

export default function ProfileImage({ src }: props) {
  return (
    <Image
      alt="ProfileImage"
      src={src}
      width={200}
      height={200}
      quality={100}
      style={{ borderRadius: "50%" }}
    />
  );
}
