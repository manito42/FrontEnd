import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import React from "react";

interface props {
  categories: CategoriesResponseDto[];
}

export default function ProfileCategories({ categories }: props) {
  return (
    <div className="flex flex-col justify-start items-center  w-[50vw] overflow-y-auto mb-10">
      <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">
        멘토링 분야
      </span>
      <div className="flex flex-wrap justify-center w-full my-3">
        {categories.length > 0 &&
          categories.map((aTag) => (
            <h6
              className="m-2 p-[0.5vw] rounded-md bg-rose-200 dark:bg-rose-700 "
              key={aTag.id}
            >
              {aTag.name}
            </h6>
          ))}
      </div>
    </div>
  );
}
