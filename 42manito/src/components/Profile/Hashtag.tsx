import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import React from "react";

interface props {
  hashtag: HashtagResponseDto[];
}

export default function ProfileHashtag({ hashtag }: props) {
  return (
    <div className="ProfileTagListWrapper">
      {hashtag.length > 0 &&
        hashtag.map((aTag) => (
          <div className="ProfileTag ProfileHashtagTag" key={aTag.id}>
            {aTag.name}
          </div>
        ))}
    </div>
  );
}
