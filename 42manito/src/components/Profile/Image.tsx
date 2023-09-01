import React from "react";
import Image from "next/image";

interface props {
  src: string;
}

export default function ProfileImage({ src }: props) {
  return (
    <div className="flex justify-center items-center">
      <Image
        alt="ProfileImage"
        src={src}
        width={200}
        height={200}
        quality={100}
        className="object-cover w-[15vh] h-[15vh] md:w-[15vw] md:h-[15vw]"
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
