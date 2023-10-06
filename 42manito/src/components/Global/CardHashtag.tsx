import React from "react";

interface props {
  name: string;
  onClick?: (tag: string) => void;
  className?: string;
  sharp?: boolean;
}

export default function CardHashtag({
  name,
  onClick,
  className,
  sharp,
}: props) {
  return (
    <>
      <div
        className={`card-hashtag-container ${className} ${
          onClick !== undefined ? "hover:cursor-pointer" : ""
        }`}
        onClick={() => onClick && onClick(name)}
      >
        <span className={`card-hashtag-name `}>
          {sharp ? `#${name}` : name}
        </span>
      </div>
    </>
  );
}
