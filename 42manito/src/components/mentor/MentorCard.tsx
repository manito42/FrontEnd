import { mentorResDto } from "@/Types/MentorProfileDto";
import React, { useState } from "react";
import Image from "next/image";

interface props {
  data: mentorResDto;
  onOpen: (data: mentorResDto) => void;
}

const MentorCard = ({ data, onOpen }: props) => {
  return (
    <>
      <div
        className="mentor-card"
        onClick={() => onOpen(data)}
        style={{ width: "230px", maxHeight: "500px", overflow: "hidden" }}
      >
        <Image
          className="rounded-t-xl object-cover layout-responsive flex w-full"
          src={data.user.profileImage}
          alt="cover image"
          width={300}
          height={300}
          quality={100}
        />
        <div className="placeholder:p-4 flex flex-col justify-center items-center ml-3 mr-3 mb-4">
          <h2 className="text-xl font-bold mt-5">{data.user.nickname}</h2>
          <h3 className=" text-l p-4 overflow-y-scroll h-[100px]">
            {data.shortDescription}
          </h3>
          <div className="flex flex-row mt-2 m-auto overflow-x-scroll w-full">
            {data.hashtags.map((aTag) => (
              <h6
                className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 "
                key={aTag.id}
              >
                {aTag.name}
              </h6>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorCard;
