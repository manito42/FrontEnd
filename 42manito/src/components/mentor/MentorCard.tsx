import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import React, { memo, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/RTK/store";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";

interface props {
  data: mentorResDto;
}

const MentorCard = ({ data }: props) => {
  const dispatch = useAppDispatch();

  const openMentorModal = (data: mentorResDto) => {
    dispatch(CurrMentorSlice.actions.setMentor(data));
    dispatch(CurrMentorSlice.actions.openMentorModal());
  };

  return (
    <>
      <div className="mentor-card" onClick={() => openMentorModal(data)}>
        <Image
          className="rounded-t-xl object-cover layout-responsive flex w-full "
          src={data.user.profileImage}
          alt="cover image"
          width={100}
          height={100}
          quality={100}
        />
        <div
          className="flex-col justify-center items-center p-2 md:p-5"
          id="MentorCardContent"
        >
          <h2 className="text-xl py-3 font-bold mt-5">{data.user.nickname}</h2>
          <h3 className="text-l py-3">{data.shortDescription}</h3>

          <div className="flex-wrap justify-center items-center py-3">
            {data.hashtags.map((aTag) => (
              <span className="text-blue-500 text-sm" key={aTag.id}>
                {`#${aTag.name} `}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const validation = (prev: props, next: props) => {
  if (prev.data.updatedAt === next.data.updatedAt) {
    return true;
  } else {
    return false;
  }
};

export default memo(MentorCard, validation);
