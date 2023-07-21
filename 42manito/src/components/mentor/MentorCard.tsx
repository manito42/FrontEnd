import React, { memo, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/RTK/store";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";

interface props {
  data: MentorProfileDto;
}

const MentorCard = ({ data }: props) => {
  const dispatch = useAppDispatch();

  const openMentorModal = (data: MentorProfileDto) => {
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
          className="w-full flex-col justify-center items-center p-2 md:p-5]"
          id="MentorCardContent"
        >
          <div className="w-full relative my-3">
            <span className="text-xl font-bold truncate">
              {data.user.nickname}
            </span>
          </div>
          <div>
            <span className="text-l py-3">{data.shortDescription}</span>
          </div>
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
