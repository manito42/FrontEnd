import { MentorProfileDto } from "@/Types/MentorProfileDto";
import React, { useState } from "react";
import Image from "next/image";
import { Row } from "antd";

interface props {
  data: MentorProfileDto;
  onOpen: (data: MentorProfileDto) => void;
}

const MentorCard = ({ data, onOpen }: props) => {
  return (
    <>
      <div className="mentor-card" onClick={() => onOpen(data)}>
        <Image
          className="rounded-t-xl object-cover layout-responsive flex "
          src={data.profileImage}
          alt="cover image"
          width={500}
          height={500}
          quality={100}
        />
        <div className="p-4 flex flex-col">
          <h1 className="text-xl font-bold">{data.nickname}</h1>
          <h3 className="mt-4 text-l">{data.shortDescription}</h3>
          <div className="flex items-start mt-2 m-auto">
            {data.hashtags.map((aTag) => (
              <h1
                className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-30"
                key={aTag.id}
              >
                {aTag.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorCard;
