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
      quality={50}
      className="object-cover w-[200px] h-[200px]"
      style={{ borderRadius: "50%" }}
    />
  );
}
