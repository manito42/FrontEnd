import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import React from "react";
import DevelopAnimation from "../Global/DevelopAnimation";
import HobbyAnimation from "../Global/HobbyAnimation";

interface props {
  categories: CategoriesResponseDto[];
}
``;

export default function ProfileCategories({ categories }: props) {
  return (
    <div className="flex flex-col justify-center items-center ">
      <span className="text-3xl font-bold text-slate-800 dark:text-slate-200 h-[5vh]">
        카테고리.
      </span>
      {categories.length > 0 && categories[0].name === "DEVELOP" ? (
        <DevelopAnimation />
      ) : (
        <HobbyAnimation />
      )}
    </div>
  );
}
