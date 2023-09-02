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
  description: string;
}

function DescriptionComponent({ description }: props) {
  if (!description) return <div>소개글이 없습니다.</div>;

  const linkedDescription = linkifyReact(description);

  return (
    <div
      className="whitespace-pre-wrap w-[100%] break-words
      px-6 py-4 rounded-2xl
      bg-gray-100 dark:bg-gray-800
      shadow-sm"
    >
      {linkedDescription}
    </div>
  );
}

export default DescriptionComponent;
