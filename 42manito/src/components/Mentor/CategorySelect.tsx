import { Select, Tag } from "antd";
import React from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useAppDispatch } from "@/RTK/store";
import { deleteCategoryId, setCategoryId } from "@/RTK/Slices/MentorConnect";
import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";

interface props {
  categories: CategoriesResponseDto[];
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={() => onClose(value.id)}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export default function ConnectCategorySelect({ categories }: props) {
  const dispatch = useAppDispatch();

  const handleChange = (value: number) => {
    dispatch(setCategoryId(value));
  };

  return (
    <Select
      tagRender={tagRender}
      onChange={handleChange}
      style={{ width: "100%" }}
      options={categories.map((tag) => ({
        label: tag.name,
        value: tag.id,
      }))}
      className="w-full max-w-[500px]"
    />
  );
}
