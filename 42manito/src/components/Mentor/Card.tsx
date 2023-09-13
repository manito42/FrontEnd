import React, { memo, useEffect } from "react";
import Image from "next/image";
import { RootState, useAppDispatch } from "@/RTK/store";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import CardHashtag from "@/components/Global/CardHashtag";
import { useModalOpenClose } from "@/hooks/Mentor/modalOpenClose";

interface props {
  data: MentorProfileDto;
}

const MentorCard = ({ data }: props) => {
  const dispatch = useAppDispatch();
  const { nickname, profileImage } = data.user;
  const { shortDescription, hashtags, categories } = data;
  const { handleMentorModalOpen } = useModalOpenClose();

  const openMentorModal = (data: MentorProfileDto) => {
    dispatch(CurrMentorSlice.actions.deleteMentor());
    dispatch(CurrMentorSlice.actions.setMentor(data));
    handleMentorModalOpen();
  };

  return (
    <>
      <div className="mentor-card card" onClick={() => openMentorModal(data)}>
        <div className="mentor-card-profile-info">
          <div className="mentor-card-image-holder">
            <Image
              className="mentor-card-image"
              src={profileImage}
              alt={nickname}
              width={200}
              height={200}
            />
          </div>
          <div className="mentor-card-texts">
            <div className="mentor-card-nickname">{nickname}</div>
            <div className="mentor-card-description">
              {shortDescription?.length > 0
                ? shortDescription
                : `${nickname}입니다.`}
            </div>
          </div>
        </div>
        <div className="mentor-card-hashtags">
          {hashtags.length > 0
            ? hashtags.map((hashtag) => (
                <CardHashtag name={hashtag.name} key={hashtag.id} />
              ))
            : categories.map((hashtag) => (
                <CardHashtag name={hashtag.name} key={hashtag.id} />
              ))}
        </div>
      </div>
    </>
  );
};

const validation = (prev: props, next: props) => {
  return prev.data.updatedAt === next.data.updatedAt;
};

export default memo(MentorCard, validation);
