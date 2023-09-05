import React from "react";

interface props {
  name: string;
  color?: string;
}

export default function CardHashtag({ name, color }: props) {
  return (
    <>
      <div className={`card-hashtag-container block-color-${color}`}>
        <span className={"card-hashtag-name"}>{name}</span>
      </div>
    </>
  );
}
