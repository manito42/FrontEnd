import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import React from "react";

interface props {
  categories: CategoriesResponseDto[];
}

export default function ProfileCategories({ categories }: props) {
  return (
    <div className="flex flex-col justify-start items-center  w-[50vw] overflow-y-auto mb-10">
      <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">
        카테고리
      </span>
      <div className="flex flex-wrap justify-center w-full my-3">
        {categories.length > 0 &&
          categories.map((aTag) => (
            <h6
              className="whitespace-nowrap m-2 text-sm rounded-full px-[0.5em] py-[0.2em] bg-rose-300 dark:bg-rose-800"
              key={aTag.id}
            >
              {aTag.name}
            </h6>
          ))}
      </div>
    </div>
  );
}
