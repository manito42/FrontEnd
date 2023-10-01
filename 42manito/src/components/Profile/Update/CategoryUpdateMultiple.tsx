import { Select } from "antd";
import React from "react";
import { useAppDispatch } from "@/RTK/store";
import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import { setCategories } from "@/RTK/Slices/ProfileUpdate";

interface props {
  categories: CategoriesResponseDto[];
  userCategories: CategoriesResponseDto[];
}

export default function CategoryUpdateMultiple({
  categories,
  userCategories,
}: props) {
  const dispatch = useAppDispatch();

  const handleChange = (value: string[]) => {
    if (value.length === 0) {
      dispatch(setCategories([]));
      return;
    }
    const categories = value.map((v) => {
      const [name, id] = v.split(":");
      return { name, id: Number(id) };
    });
    dispatch(setCategories(categories));
  };

  return (
    <div className="profile-update-hashtag-input-wrapper">
      <Select
        mode="multiple"
        placeholder={"멘토링 분야를 선택해주세요."}
        onChange={handleChange}
        options={categories.map((tag) => ({
          label: tag.name,
          value: `${tag.name}:${tag.id}`,
        }))}
        value={userCategories.map((tag) => `${tag.name}:${tag.id}`)}
        className="md:w-[25em] w-[100%] mb-5"
      />
    </div>
  );
}
