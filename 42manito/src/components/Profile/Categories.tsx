import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import React from "react";

interface props {
  categories: CategoriesResponseDto[];
  onClick?: any;
}

export default function ProfileCategories({ categories }: props) {
  return (
    <div className="ProfileTagListWrapper">
      {categories.length > 0 &&
        categories.map((aTag) => (
          <h6 className="ProfileTag ProfileCategoryTag" key={aTag.id}>
            {aTag.name}
          </h6>
        ))}
    </div>
  );
}
