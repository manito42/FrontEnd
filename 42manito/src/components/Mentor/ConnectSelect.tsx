import { Select, Tag } from "antd";
import React, { useState } from "react";
import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { RootState, useAppDispatch } from "@/RTK/store";
import { deleteHashtag, setHashtags } from "@/RTK/Slices/MentorConnect";
import { useSelector } from "react-redux";

interface props {
  hashtag: HashtagResponseDto[];
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={"blue"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={() => onClose(value.id)}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export default function MentorConnectSelect({ hashtag }: props) {
  const dispatch = useAppDispatch();
  const onClose = (selectedValue: number) => {
    // hashtag 삭제
    dispatch(deleteHashtag(selectedValue));
  };

  const handleChange = (value: Array<number>) => {
    const selectedHashtags = hashtag.filter((tag) => value.includes(tag.id));
    const selectedHashtagIds = selectedHashtags.map((tag) => {
      return { id: tag.id };
    });

    dispatch(setHashtags(selectedHashtagIds));
  };

  return (
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      onChange={handleChange}
      style={{ width: "100%" }}
      options={hashtag.map((tag) => ({
        label: tag.name,
        value: tag.id,
      }))}
      className="w-full max-w-[500px]"
    />
  );
}
