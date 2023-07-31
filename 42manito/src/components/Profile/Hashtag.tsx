import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import React from "react";

interface props {
  hashtag: HashtagResponseDto[];
}

export default function ProfileHashtag({ hashtag }: props) {
  return (
    <div className="flex flex-col justify-between items-center md:ml-24 w-[40vh] h-[40vh] overflow-y-auto">
      <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">
        해시태그.
      </span>
      <div className="flex flex-wrap w-full">
        {hashtag.length > 0 &&
          hashtag.map((aTag) => (
            <h6
              className="m-3 p-3 rounded-md bg-sky-200 dark:bg-sky-700 "
              key={aTag.id}
            >
              {aTag.name}
            </h6>
          ))}
      </div>
    </div>
  );
}
