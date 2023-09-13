import React from "react";
import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";

interface props {
  category: CategoriesResponseDto;
  isActivated: boolean;
  onCLick: (category: CategoriesResponseDto) => void;
}

export default function CategoryIcon({
  category,
  isActivated,
  onCLick,
}: props) {
  return (
    <>
      <span
        className={`home-category-icon ${isActivated ? "active" : ""}`}
        onClick={() => {
          onCLick(category);
        }}
      >
        {category.name}
      </span>
    </>
  );
}
