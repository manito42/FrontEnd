import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import React from "react";
import { useRouter } from "next/router";

interface props {
  hashtag: HashtagResponseDto[];
  onClick?: (hashtag: string) => void;
}

export default function ProfileHashtag({ hashtag, onClick }: props) {
  const router = useRouter();
  const handleClick = onClick
    ? onClick
    : (hashtag: string) => {
        router.push(`/Search/${hashtag}`);
      };

  return (
    <div className="ProfileTagListWrapper">
      {hashtag.length > 0 &&
        hashtag.map((aTag) => (
          <button
            className="ProfileTag ProfileHashtagTag"
            key={aTag.id}
            onClick={() => handleClick(aTag.name)}
          >
            {aTag.name}
          </button>
        ))}
    </div>
  );
}
