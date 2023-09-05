import React from "react";
import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import CategoryIcon from "@/components/Home/CategoryIcon";

interface props {
  categories: CategoriesResponseDto[] | undefined;
  categoryClickHandler: (categoryId: number) => void;
}

export default function CategoryIconList({
  categories,
  categoryClickHandler,
}: props) {
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);
  const showAll: CategoriesResponseDto = {
    name: "전체보기",
    id: 0,
  };
  const handleOnClick = (category: CategoriesResponseDto) => {
    setSelectedCategory(category.id);
    categoryClickHandler(category.id);
  };
  return (
    <>
      <div className="home-category-container">
        <CategoryIcon
          category={showAll}
          isActivated={selectedCategory === 0}
          onCLick={handleOnClick}
        ></CategoryIcon>
        {categories !== undefined &&
          categories?.map((category, idx) => (
            <CategoryIcon
              category={category}
              isActivated={selectedCategory === category.id}
              onCLick={handleOnClick}
              key={idx}
            />
          ))}
      </div>
    </>
  );
}
