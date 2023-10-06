import React, { memo } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/RTK/store";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import CardHashtag from "@/components/Global/CardHashtag";
import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";

interface props {
  data: MentorProfileDto;
}

/*
 * hashtag 가 card 를 범람하지 않도록 하기 위함.
 * 더 나은 방법이 있따면 해당 방법으로 변경할 것.
 * */
const sliceHashtags = (hashtags: HashtagResponseDto[], limit: number) => {
  let acc = 0;
  let slicedHashtags: HashtagResponseDto[] = [];
  for (const hashtag of hashtags) {
    if (acc >= limit) {
      break;
    }
    if (acc + hashtag.name.length > limit) {
      continue;
    }
    acc += hashtag.name.length + 7; // 최적화된 값임.. 6은 #{} 의 길이
    slicedHashtags.push(hashtag);
  }
  return slicedHashtags;
};

const MentorCard = ({ data }: props) => {
  const dispatch = useAppDispatch();
  const { nickname, profileImage } = data.user;
  const { shortDescription, hashtags } = data;
  const slicedHashtags = sliceHashtags(hashtags, 32);
  const openMentorModal = (data: MentorProfileDto) => {
    dispatch(CurrMentorSlice.actions.deleteMentor());
    dispatch(CurrMentorSlice.actions.setMentor(data));
    dispatch(CurrMentorSlice.actions.openMentorModal());
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
          {slicedHashtags.map((hashtag, idx) => (
            <CardHashtag name={`#${hashtag.name}`} key={idx} />
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
