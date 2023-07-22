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
          className="mentor-image-container"
          src={data.user.profileImage}
          alt="cover image"
          width={100}
          height={100}
          quality={80}
        />
        <div className="mentor-card-content" id="MentorCardContent">
          <div className="user-nickname-container">
            <span className="user-nickname">{data.user.nickname}</span>
          </div>
          <div>
            <span className="user-short-description">
              {data.shortDescription}
            </span>
          </div>
          <div className="hashtag-container">
            {data.hashtags.map((aTag) => (
              <span className="hashtags-font" key={aTag.id}>
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
