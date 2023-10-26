import React, { useState } from "react";
import { Img } from "@storybook/components";

interface props {
  src: string;
}

export default function ProfileImage({ src }: props) {
  const [image, setImage] = useState(src);

  return (
    <div className="ProfileImageWrapper">
      <Img
        alt="ProfileImage"
        src={image}
        width={200}
        height={200}
        onError={() => setImage("/default_profile.png")}
        className="ProfileImage"
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
