import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import React from "react";

interface props {
  hashtag: HashtagResponseDto[];
}

export default function ProfileHashtag({ hashtag }: props) {
  return (
    <div className="flex flex-col justify-start items-center w-[50vw] overflow-y-auto mb-10">
      <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">
        관심분야
      </span>
      <div className="flex flex-wrap justify-center w-full my-3">
        {hashtag.length > 0 &&
          hashtag.map((aTag) => (
            <h6
              className="m-2 p-[0.5vw] rounded-md bg-sky-200 dark:bg-sky-700 "
              key={aTag.id}
            >
              {aTag.name}
            </h6>
          ))}
      </div>
    </div>
  );
}
