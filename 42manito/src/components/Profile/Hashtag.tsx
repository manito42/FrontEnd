import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import React from "react";
import { useRouter } from "next/router";

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
            <button
              className="whitespace-nowrap m-2 text-sm rounded-full px-[0.5em] py-[0.2em] bg-sky-300 dark:bg-sky-800"
              key={aTag.id}
            >
              {aTag.name}
            </button>
          ))}
      </div>
    </div>
  );
}
