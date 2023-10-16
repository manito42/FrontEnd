import React from "react";

function linkifyReact(inputText: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // split the text by URL
  const parts = inputText.split(urlRegex);

  // map over the parts and return either a link or a span
  return parts.map((part: string, index: number) => {
    if (urlRegex.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

interface props {
  description: string | undefined;
}

function DescriptionComponent({ description }: props) {
  if (!description)
    return (
      <div className="profile-description">
        <div className={"flex flex-row justify-center"}>소개글이 없습니다.</div>
      </div>
    );

  const linkedDescription = linkifyReact(description);

  return <div className="profile-description">{linkedDescription}</div>;
}

export default DescriptionComponent;
