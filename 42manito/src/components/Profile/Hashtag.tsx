import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import React from "react";

interface props {
  hashtag: HashtagResponseDto[];
  onClick?: (hashtag: string) => void;
}

export default function ProfileHashtag({ hashtag, onClick }: props) {
  const handleClick = onClick ? onClick : (hashtag: string) => {};

  return (
    <div className="ProfileTagListWrapper">
      {hashtag.length > 0 &&
        hashtag.map((aTag) => (
          <button
            className="ProfileTag ProfileHashtagTag"
            key={aTag.id}
            onClick={() => {
              handleClick(aTag.name);
            }}
          >
            {aTag.name}
          </button>
        ))}
    </div>
  );
}
