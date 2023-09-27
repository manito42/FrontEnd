import React from "react";

interface props {
  name: string;
  color?: string;
  onClick?: (tag: string) => void;
  className?: string;
}

export default function CardHashtag({
  name,
  color,
  onClick,
  className,
}: props) {
  return (
    <>
      <div
        className={`card-hashtag-container block-color-${color} ${
          onClick !== undefined ? "hover:cursor-pointer" : ""
        }`}
        onClick={() => onClick && onClick(name)}
      >
        <span className={`card-hashtag-name ${className}`}>{name}</span>
      </div>
    </>
  );
}
