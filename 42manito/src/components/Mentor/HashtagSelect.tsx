import { Select, Tag } from "antd";
import React from "react";
import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useAppDispatch } from "@/RTK/store";
import { setHashtags } from "@/RTK/Slices/MentorConnect";

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
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={() => onClose(value.id)}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export default function ConnectHashtagSelect({ hashtag }: props) {
  const dispatch = useAppDispatch();

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
